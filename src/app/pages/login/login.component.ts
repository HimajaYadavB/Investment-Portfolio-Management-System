import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserdashboardService } from '../../services/userdashboard.service';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  constructor(private auth:AuthService, private router:Router, private dash: UserdashboardService){

  }

  login() {

    this.dash.setEmailService(this.email)
    //console.log('Username:', this.email);
    //console.log('Password:', this.password);
    const obj = { email:this.email, password: this.password };

    this.auth.loginservice(obj).subscribe({
      next: (response) => {
        //alert('Login successful!');
        //console.log('Response:', response);
        this.router.navigate(['/user-dashboard']);
      },
      error: (error) => {
        //alert('Login failed! Please check your credentials.');
        console.error('Error:', error);
      }
    });

  }
}
