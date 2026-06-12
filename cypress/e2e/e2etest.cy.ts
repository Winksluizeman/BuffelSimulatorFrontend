describe('BuffelSimulator E2E Tests', () => {

  const testUser = {
    username: 'cypress_testuser',
    email: 'cypress@test.com',
    password: 'Test1234!'
  };

  const testExercise = {
    name: 'Bench Press',
    category: 'Push',
    weight: '80',
    reps: '8'
  };

  beforeEach(() => {
    // Mock alle backend calls
    cy.intercept('POST', 'http://localhost:8080/auth/register', { statusCode: 200 }).as('register');
    cy.intercept('POST', 'http://localhost:8080/auth/login', {
      statusCode: 200,
      body: { token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjeXByZXNzX3Rlc3R1c2VyIn0.test' }
    }).as('login');
    cy.intercept('GET', 'http://localhost:8080/Weight', {
      statusCode: 200,
      body: [{ name: 'Bench Press', category: 'Push', weight: 80, reps: 8 }]
    }).as('getExercises');
    cy.intercept('POST', 'http://localhost:8080/Weight', { statusCode: 201 }).as('saveExercise');
  });

  // ─── 1. Registreren ───────────────────────────────────────────────
  describe('Registreren', () => {

    it('gebruiker kan registreren via het registratieformulier', () => {
      cy.visit('/register');
      cy.get('input[name="username"]').type(testUser.username, { force: true });
      cy.get('input[name="email"]').type(testUser.email, { force: true });
      cy.get('input[name="password"]').type(testUser.password, { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait('@register');
      cy.url().should('include', '/login');
    });

  });

  // ─── 2. Inloggen ──────────────────────────────────────────────────
  describe('Inloggen', () => {

    it('gebruiker kan inloggen en wordt doorgestuurd naar de weight pagina', () => {
      cy.visit('/login');
      cy.get('input[name="username"]').type(testUser.username, { force: true });
      cy.get('input[name="password"]').type(testUser.password, { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait('@login');
      cy.url().should('include', '/weight');
    });

    it('verkeerde credentials geven een foutmelding', () => {
      cy.intercept('POST', 'http://localhost:8080/auth/login', {
        statusCode: 401,
        body: { message: 'Unauthorized' }
      }).as('loginFailed');

      cy.visit('/login');
      cy.get('input[name="username"]').type('verkeerde_gebruiker', { force: true });
      cy.get('input[name="password"]').type('verkeerd_wachtwoord', { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait('@loginFailed');
      cy.url().should('include', '/login');
    });

  });

  // ─── 3. Oefening opslaan ──────────────────────────────────────────
  describe('Oefening opslaan', () => {

    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[name="username"]').type(testUser.username, { force: true });
      cy.get('input[name="password"]').type(testUser.password, { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait('@login');
      cy.url().should('include', '/weight');
    });

    it('gebruiker kan een oefening opslaan via het formulier', () => {
      cy.get('input[name="name"]').type(testExercise.name, { force: true });
      cy.get('input[name="category"]').type(testExercise.category, { force: true });
      cy.get('input[name="weight"]').type(testExercise.weight, { force: true });
      cy.get('input[name="reps"]').type(testExercise.reps, { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait('@saveExercise');
      cy.contains(testExercise.name).should('be.visible');
    });

    it('opgeslagen oefeningen zijn zichtbaar in de tabel', () => {
      cy.wait('@getExercises');
      cy.get('table').should('be.visible');
      cy.get('table tr').should('have.length.greaterThan', 1);
      cy.contains('td', testExercise.name).should('exist');
      cy.contains('td', testExercise.category).should('exist');
    });

  });

  // ─── 4. Beveiliging ───────────────────────────────────────────────
  describe('Beveiliging', () => {

    it('uitgelogde gebruiker wordt doorgestuurd naar de loginpagina', () => {
      cy.clearLocalStorage();
      cy.visit('/weight');
      cy.url().should('include', '/login');
    });

    it('weight pagina is niet bereikbaar zonder token', () => {
      cy.clearLocalStorage();
      cy.visit('/weight');
      cy.get('table').should('not.exist');
    });

  });

});
