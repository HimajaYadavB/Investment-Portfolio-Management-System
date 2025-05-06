import { Component } from '@angular/core';
import { BrokersService } from '../../services/brokers.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broker-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './broker-register.component.html',
  styleUrl: './broker-register.component.css'
})
export class BrokerRegisterComponent {
  brokerName: string = '';
  contactDetails: string = '';
  commissionRate: number = 0;
  licenseNumber: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;
  constructor(private auth: BrokersService, private router: Router) {

  }
  checkPasswords() {
    this.passwordError = this.password !== this.confirmPassword; // Update error flag
  }
  
  register(){
    if (this.passwordError) {
      alert('Passwords do not match!');
      return;
    }  
    const brokerData = {
      brokerName:this.brokerName,
      contactDetails:this.contactDetails,
      commissionRate:this.commissionRate,
      licenseNumber:this.licenseNumber,
      email:this.email,
      password:this.password
    }

    this.auth.brokerRegisterService(brokerData).subscribe({
      next:(response)=>{
        alert('Register Request Raised Successfully!');
        console.log('Response:', response);
        this.router.navigate(['broker-login']);
      },
      error:(error)=>{
        alert('Register failed');
        console.error('Error:', error);
      }
    })
  }
}
