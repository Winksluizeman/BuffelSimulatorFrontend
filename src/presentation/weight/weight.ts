import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { WeightDto } from '../../infrastructure/dto/weight.dto';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, NgIf],
  templateUrl: './weight.html',
  styleUrls: ['./weight.css']
})

export class Weight implements OnInit, OnDestroy {

  private eventSource: EventSource | null = null;

  username: string = '';
  exercise: WeightDto = { name: '', category: '', weight: 0, reps: 0 };
  displayedColumns: string[] = ['name', 'category', 'weight', 'reps'];
  exercises: WeightDto[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    this.loadExercises();
    this.subscribeToEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }

  subscribeToEvents(): void {
    const token = this.authService.getToken();
    this.eventSource = new EventSource(
      `http://localhost:8080/Weight/events?token=${token}`
    );

    this.eventSource.addEventListener('exercise-saved', () => {
      this.loadExercises();
    });

    this.eventSource.onerror = () => {
      this.eventSource?.close();
    };
  }

  onSubmit(): void {
    this.http.post('http://localhost:8080/Weight', this.exercise).subscribe({
      next: () => console.log('Opgeslagen'),
      error: (err) => console.error('Fout:', err)
    });
  }

  loadExercises(): void {
    this.http.get<WeightDto[]>('http://localhost:8080/Weight').subscribe({
      next: (data) => {
        this.exercises = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ophalen mislukt:', err)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
