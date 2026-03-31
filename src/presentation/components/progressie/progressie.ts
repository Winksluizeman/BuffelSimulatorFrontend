import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-progressie',
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './progressie.html',
  styleUrl: './progressie.css',
})
export class Progressie {

}
