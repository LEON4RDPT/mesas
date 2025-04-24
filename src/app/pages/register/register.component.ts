import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserWithPassword } from '../../interfaces/users';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    MatButton,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordsDoNotMatch: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieHandler: CookieService,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form with validation rules
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repPassword: ['', [Validators.required]],
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { password, repPassword } = this.registerForm.value;

      // Check if passwords match
      if (password !== repPassword) {
        this.passwordsDoNotMatch = true;
        return;
      }
      this.passwordsDoNotMatch = false;
      const user: UserWithPassword = {
        id: 0,
        name: this.registerForm.value.nome,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
        isAdmin: false,
      };
      this.authService.register(user).subscribe({
        next: (response) => {
          if (response.ok) {
            this.openSnackBar('Registado com sucesso!', 'Fechar');
            
            const token : string = response.body.token;
            if (!token) return;
            this.cookieHandler.setCookie('authToken', token, 1)
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          if (error.status === 400) {
            this.openSnackBar('Dados Inválidos!', 'Fechar');
          } else if (error.status === 409) {
            this.openSnackBar('Email já em uso!', 'Fechar');
          } else {
            this.openSnackBar('Erro no servidor, por favor tente mais tarde.', 'Fechar');
          }
        },
      });
    }
  }
  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
    });
  }
}
