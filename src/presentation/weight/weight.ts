import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { WeightDto } from '../../infrastructure/dto/weight.dto';
import { WeightService } from './weight.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, NgIf],
  templateUrl: './weight.html',
  styleUrls: ['./weight.css']
})
export class Weight implements OnInit {

  exercise: WeightDto = { name: '', category: '', weight: 0, reps: 0 };
  username: string = '';
  displayedColumns: string[] = ['name', 'category', 'weight', 'reps'];
  exercises: WeightDto[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private weightService: WeightService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    this.loadExercises();
  }

  loadExercises(): void {
    this.weightService.getAll().subscribe({
      next: (data) => {
        this.exercises = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Fout bij laden:', err)
    });
  }

  onSubmit(): void {
    this.weightService.save(this.exercise).subscribe({
      next: () => {
        this.exercise = { name: '', category: '', weight: 0, reps: 0 };
        this.loadExercises();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Fout bij opslaan:', err)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
