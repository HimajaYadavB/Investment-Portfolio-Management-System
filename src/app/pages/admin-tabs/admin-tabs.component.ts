import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-tabs',
  imports: [],
  templateUrl: './admin-tabs.component.html',
  styleUrl: './admin-tabs.component.css'
})
export class AdminTabsComponent {
  activeTab: string = 'user-dashboard'; // Default to dashboard

  constructor(private router: Router) {}

  switchTab(tabRoute: string) {
    this.activeTab = tabRoute;
    this.router.navigate([tabRoute]); // Navigate to main tab route

  }

}
