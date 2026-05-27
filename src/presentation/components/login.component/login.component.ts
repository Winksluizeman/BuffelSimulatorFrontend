import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {LoginDto, LoginResponseDto} from '../../../dto/LoginDto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials: LoginDto = { username: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    this.http.post<LoginResponseDto>('http://localhost:8080/auth/login', this.credentials)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/weight']);
        },
        error: () => alert('Gebruikersnaam of wachtwoord onjuist')
      });
  }
}
