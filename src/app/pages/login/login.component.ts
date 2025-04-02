import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.auth.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Response:', response);
          switch (response.status) {
            case 200:
              alert('Login bem sucedido');
              break;
            default:
              alert('Erro!');
              break;
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Erro ao fazer login!');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}