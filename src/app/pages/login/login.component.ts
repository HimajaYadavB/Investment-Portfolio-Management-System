import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserdashboardService } from '../../services/userdashboard.service';
import { AdminService } from '../../services/admin.service';
import { BrokersService } from '../../services/brokers.service';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedRole: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private brokerService: BrokersService,
    private userService: AuthService,
    private dash: UserdashboardService
  ) {}

  login() {
    const credentials = { email: this.email, password: this.password };

    switch (this.selectedRole) {
      case 'admin':
        this.adminService.adminloginservice(credentials).subscribe({
          next: () => this.router.navigate(['/admin-dashboard']),
          error: (err) => console.error('Admin login error:', err)
        });
        break;

      case 'broker':
        this.brokerService.brokerLoginService(credentials).subscribe({
          next: () => this.router.navigate(['/broker-dashboard']),
          error: (err) => alert('Broker login failed!')
        });
        break;

      case 'user':
        this.dash.setEmailService(this.email);
        this.userService.loginservice(credentials).subscribe({
          next: () => this.router.navigate(['/user-dashboard']),
          error: (err) => console.error('User login error:', err)
        });
        break;

      default:
        alert('Please select a role!');
    }
  }
}
