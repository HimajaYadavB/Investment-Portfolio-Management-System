import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AdminService, private router:Router){}

  login(){
    const obj = { email:this.email, password: this.password };
    this.auth.adminloginservice(obj).subscribe({
      next: (response) => {
        this.router.navigate(['/admin-dashboard']);
      },
      error: (error) => {
        //alert('Login failed! Please check your credentials.');
        console.error('Error:', error);
      }
    });
  }
}
