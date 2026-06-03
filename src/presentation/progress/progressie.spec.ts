import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Progressie } from './progressie';

describe('Progressie', () => {
  let component: Progressie;
  let fixture: ComponentFixture<Progressie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Progressie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Progressie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
