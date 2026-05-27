import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { WeightDto} from '../../../dto/weight.dto';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule],
  templateUrl: './weight.html',
  styleUrls: ['./weight.css']
})
export class Weight implements OnInit {

  exercise: WeightDto = {
    name: '',
    category: '',
    weight: 0,
    reps: 0
  };

  name: string = '';



  displayedColumns: string[] = ['name', 'category', 'weight', 'reps'];
  exercises: WeightDto[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.name = this.getNameFromToken();
    this.loadExercises();
  }

  getNameFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  onSubmit(): void {
    this.http.post('http://localhost:8080/Weight', this.exercise).subscribe({
      next: () => {
        console.log('Verzonden naar database');
        this.loadExercises();
      },
      error: (err) => console.error('Versturen naar de database niet gelukt:', err)
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
}
