import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { Navbar } from '../presentation/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Navbar],
  templateUrl: 'app.html',
  styleUrl: 'app.css'
})
export class App {
  protected readonly title = signal('BuffelSimulatorFrontend');
  meetings = {
    '2026-03-24': ['Drink Coffee', 'Learn React', 'Sleep'],
    '2026-03-22': ['Drink Coffee', 'Learn Angular', 'Sleep'],
  }
  protected selected: any;
}
