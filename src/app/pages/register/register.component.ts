import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone:true
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  dob = '';
  address = '';
  phone = '';
  passwordError = false;

  constructor(private auth: AuthService) {

  }
  checkPasswords() {
    this.passwordError = this.password !== this.confirmPassword; // Update error flag
  }
  
  register(){
    if (this.passwordError) {
      alert('Passwords do not match!');
      return;
    }
    const userData={
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      dob: this.dob,
      address: this.address,
      phone: this.phone
    };

    this.auth.registerservice(userData).subscribe({
      next: (response) => {
        alert('Register successful!');
        console.log('Response:', response);
        // Redirect to dashboard (if needed)
      },
      error: (error) => {
        alert('Login failed! Please check your credentials.');
        console.error('Error:', error);
      }
    });
  }
}
