import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private cookieHandler: CookieService
  ) {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Response:', response);
          const token = response.body.token;
          if (!token) return;
          this.cookieHandler.setCookie('authToken', token, 1);
          alert('Login bem sucedido!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          switch (error.status) {
            case 404:
              alert('Utilizador não encontrado!');
              break;
            case 401:
              alert('Password incorreta!');
              break;
            case 400:
              alert('Campos inválidos!');
              break;
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
