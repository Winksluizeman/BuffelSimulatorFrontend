import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { NgIf } from '@angular/common';
import { vi } from 'vitest';
import { Weight } from './weight';
import { WeightService } from './weight.service';
import { WeightDto} from '../../infrastructure/dto/weight.dto';

describe('Weight', () => {
  let component: Weight;
  let fixture: ComponentFixture<Weight>;
  let weightServiceMock: { getAll: ReturnType<typeof vi.fn>; save: ReturnType<typeof vi.fn> };

  const mockExercises: WeightDto[] = [
    { name: 'Bench Press', category: 'push', weight: 80, reps: 10 },
    { name: 'Squat', category: 'leg', weight: 100, reps: 8 },
  ];

  beforeEach(async () => {
    weightServiceMock = {
      getAll: vi.fn().mockReturnValue(of(mockExercises)),
      save: vi.fn().mockReturnValue(of({})),
    };

    // localStorage mock zodat getNameFromToken() niet crasht
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    await TestBed.configureTestingModule({
      imports: [
        Weight,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        BrowserAnimationsModule,
        NgIf,
      ],
      providers: [
        { provide: WeightService, useValue: weightServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Weight);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ─── 1. Component aanmaken ───

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ─── 2. Oefeningen laden bij init ───

  it('laadt oefeningen op bij ngOnInit', () => {
    expect(weightServiceMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.exercises).toEqual(mockExercises);
  });

  // ─── 3. Save aangeroepen met juiste waarden bij submit ───

  it('roept WeightService.save() aan met de ingevoerde waarden bij submit', () => {
    component.exercise = { name: 'Deadlift', category: 'pull', weight: 120, reps: 5 };
    fixture.detectChanges();

    component.onSubmit();

    expect(weightServiceMock.save).toHaveBeenCalledTimes(1);
    expect(weightServiceMock.save).toHaveBeenCalledWith({
      name: 'Deadlift',
      category: 'pull',
      weight: 120,
      reps: 5,
    });
  });

  // ─── 4. Oefeningen herladen na succesvolle submit ───

  it('herlaadt de oefeningen na een succesvolle submit', () => {
    component.onSubmit();
    expect(weightServiceMock.getAll).toHaveBeenCalledTimes(2);
  });

  // ─── 5. Submit-knop uitgeschakeld bij leeg formulier ───

  it('houdt de submit-knop uitgeschakeld zolang het formulier ongeldig is', async () => {
    component.exercise = { name: '', category: '', weight: 0, reps: 0 };
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  // ─── 6. Fout bij laden wordt afgehandeld zonder crash ───

  it('crasht niet als getAll een fout teruggeeft', () => {
    weightServiceMock.getAll.mockReturnValue(throwError(() => new Error('Network error')));
    expect(() => component.loadExercises()).not.toThrow();
  });
});
