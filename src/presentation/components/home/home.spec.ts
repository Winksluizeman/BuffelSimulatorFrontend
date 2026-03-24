import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCalender } from './home';

describe('Home', () => {
  let component: HomeCalender;
  let fixture: ComponentFixture<HomeCalender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCalender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCalender);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
