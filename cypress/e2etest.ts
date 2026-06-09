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

  // ─── 1. Registreren ───────────────────────────────────────────────
  describe('Registreren', () => {

    it('gebruiker kan registreren via het registratieformulier', () => {
      cy.visit('/register');

      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/login');
    });

  });

  // ─── 2. Inloggen ──────────────────────────────────────────────────
  describe('Inloggen', () => {

    it('gebruiker kan inloggen en wordt doorgestuurd naar de weight pagina', () => {
      cy.visit('/login');

      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/weight');
    });

    it('verkeerde credentials geven een foutmelding', () => {
      cy.visit('/login');

      cy.get('input[name="username"]').type('verkeerde_gebruiker');
      cy.get('input[name="password"]').type('verkeerd_wachtwoord');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/login');
    });

  });

  // ─── 3. Oefening opslaan ──────────────────────────────────────────
  describe('Oefening opslaan', () => {

    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/weight');
    });

    it('gebruiker kan een oefening opslaan via het formulier', () => {
      cy.get('input[name="name"]').type(testExercise.name);
      cy.get('input[name="category"]').type(testExercise.category);
      cy.get('input[name="weight"]').type(testExercise.weight);
      cy.get('input[name="reps"]').type(testExercise.reps);
      cy.get('button[type="submit"]').click();

      cy.contains(testExercise.name).should('be.visible');
    });

    it('opgeslagen oefeningen zijn zichtbaar in de tabel', () => {
      cy.get('table').should('be.visible');
      cy.get('table tr').should('have.length.greaterThan', 1);
      cy.contains('td', testExercise.name).should('exist');
      cy.contains('td', testExercise.category).should('exist');
    });

  });

  // ─── 4. Uitgelogde gebruiker ──────────────────────────────────────
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
