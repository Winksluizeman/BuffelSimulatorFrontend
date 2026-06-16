import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import { LoginDto, LoginResponseDto} from '../../infrastructure/dto/LoginDto';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {

  credentials: LoginDto = {username: '', password: ''};

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/weight']);
      },
      error: () => alert('Gebruikersnaam of wachtwoord onjuist')
    });
  }

}

