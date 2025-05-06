import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-broker-approval',
  imports: [FormsModule, CommonModule],
  templateUrl: './broker-approval.component.html',
  styleUrl: './broker-approval.component.css'
})
export class BrokerApprovalComponent {
  brokers: any[] = [];
  constructor(private admin: AdminService){
    this.loadBrokers();
  }
  loadBrokers() {
    this.admin.adminGetPendingBrokers().subscribe({
      next: (res) => {
        this.brokers = res.brokers;
      },
      error: (err) => {
        console.error('Error loading brokers:', err);
      }
    });
  }

  approve(brokerId: number) {
    this.admin.approveBroker(brokerId).subscribe({
      next: (response) => {
        console.log('Approve Success:', response);
        alert('Broker approved successfully!');
        this.loadBrokers();  // Refresh the brokers list after success
      },
      error: (error) => {
        console.error('Approve Error:', error);
        alert('Failed to approve broker.');
      }
    });
  }

  reject(brokerId: number) {
    this.admin.rejectBroker(brokerId).subscribe({
      next: (response) => {
        console.log('Reject Success:', response);
        alert('Broker rejected and removed successfully!');
        this.loadBrokers();  // Refresh the brokers list after success
      },
      error: (error) => {
        console.error('Reject Error:', error);
        alert('Failed to reject broker.');
      }
    });
  }

  
}
