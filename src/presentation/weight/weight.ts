import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { WeightDto} from '../../infrastructure/dto/weight.dto';
import { WeightService } from './weight.service';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, NgIf],
  templateUrl: './weight.html',
  styleUrls: ['./weight.css']
})
export class Weight implements OnInit {

  exercise: WeightDto = { name: '', category: '', weight: 0, reps: 0 };
  name: string = '';
  displayedColumns: string[] = ['name', 'category', 'weight', 'reps'];
  exercises: WeightDto[] = [];

  constructor(private weightService: WeightService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.name = this.getNameFromToken();
    this.loadExercises();
  }

  getNameFromToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  onSubmit(): void {
    this.weightService.save(this.exercise).subscribe({
      next: () => {
        console.log('Verzonden naar database');
        this.loadExercises();
      },
      error: (err) => console.error('Versturen naar de database niet gelukt:', err)
    });
  }

  loadExercises(): void {
    this.weightService.getAll().subscribe({
      next: (data) => {
        this.exercises = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ophalen mislukt:', err)
    });
  }
}
