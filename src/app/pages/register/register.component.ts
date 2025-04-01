import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { UserWithPassword } from '../../interfaces/users';

@Component({
  selector: 'app-register',
  imports: [CommonModule,NavbarComponent,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: FormGroup;
  passwordsDoNotMatch: boolean = false;

  constructor(private fb: FormBuilder) {
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
      const user: UserWithPassword = {id:0,nome: this.registerForm.value.nome, password: this.registerForm.value.password, email: this.registerForm.value.email, isAdmin: false}
      console.log(user);
      alert('Registration successful!');
    } else {
      console.log('Form is invalid');
    }
  }
}