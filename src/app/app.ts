import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../presentation/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: 'app.html',
  styleUrl: 'app.css'
})
export class App {
  protected readonly title = signal('BuffelSimulatorFrontend');
  protected selected: any;

  // Weights
  pushWeights: number[] = [0, 0, 0, 0, 0, 0];

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    const body = {
      type: 'push',
      weights: this.pushWeights
    };

    this.http.post('http://localhost:8080/Weight', body).subscribe({
      next: (res) => console.log('Verzonden naar de database:', res),
      error: (err) => console.error('Fout:', err)
    });
  }
}
