import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { UserWithPassword } from '../../interfaces/users';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,NavbarComponent  ,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  passwordsDoNotMatch: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    // Initialize the form with validation rules
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repPassword: ['', [Validators.required]]
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
      console.log('Form submitted successfully:', this.registerForm.value);
      const user: UserWithPassword = {
        id: 0, name: this.registerForm.value.nome, password: this.registerForm.value.password, email: this.registerForm.value.email,
        isAdmin: false
      }
      this.authService.register(user).subscribe({
        next: (response) => {
          if (response.ok) {
            alert("Registado com sucesso!");
            this.router.navigate(['/login'])
          }
        },
        error:(error) => {
          if (error.status === 400) {
            alert("dados Inválidos!")
          } else if (error.status === 409) {
            alert("Email já existente!");
          } else {
            alert("Erro no Servidor!");
          }
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }
}