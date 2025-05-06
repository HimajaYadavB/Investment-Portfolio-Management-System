import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-payments',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.css'
})
export class UserPaymentsComponent {
  constructor(private router:Router){}
  activeTab: string = '';
  switchTab(tabRoute: string) {
    this.router.navigate([tabRoute]); // Now go to /user-payments directly
  }
}
