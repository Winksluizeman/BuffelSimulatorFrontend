import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { Navbar } from '../presentation/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,Navbar],
  templateUrl: 'app.html',
  styleUrl: '../styles.css'
})
export class App {
  protected readonly title = signal('BuffelSimulatorFrontend');
}
