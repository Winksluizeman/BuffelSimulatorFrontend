import { Component } from '@angular/core';
import {ChangeDetectionStrategy,model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatDatepickerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [provideNativeDateAdapter()],
})
export class Home {
  selected = model<Date | null>(null);
}
