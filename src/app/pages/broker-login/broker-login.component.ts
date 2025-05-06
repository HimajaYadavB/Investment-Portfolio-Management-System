import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrokersService } from '../../services/brokers.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-broker-login',
  imports: [FormsModule],
  templateUrl: './broker-login.component.html',
  styleUrl: './broker-login.component.css'
})
export class BrokerLoginComponent {

  email: string = '';
  password: string = '';
  constructor(private router: Router, private b: BrokersService){

  }
  login() {

    const obj = { email:this.email, password: this.password };

    this.b.brokerLoginService(obj).subscribe({
      next: (response) => {
        alert('Login successful!');
        //console.log('Response:', response);
        this.router.navigate(['/broker-dashboard']);
      },
      error: (error) => {
        alert('Login failed! Please check your credentials.');
        console.error('Error:', error);
      }
    });

  }
  register() {

    const obj = { email:this.email, password: this.password };

    this.b.brokerRegisterService(obj).subscribe({
      next: (response) => {
        alert('Register Request Raised!');
        //console.log('Response:', response);
        this.router.navigate(['/broker-login']);
      },
      error: (error) => {
        alert('Register Failed');
        console.error('Error:', error);
      }
    });

  }
}
