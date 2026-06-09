import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.html',
})
export class RegisterComponent {

  credentials = { username: '', email: '', password: '' };

  constructor(private authService: AuthService, protected router: Router) {}

  onRegister(): void {
    this.authService.register(this.credentials).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Registratie mislukt, probeer opnieuw')
    });
  }
}
