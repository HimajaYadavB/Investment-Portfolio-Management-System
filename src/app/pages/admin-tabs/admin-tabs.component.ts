import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({
  selector: 'app-admin-tabs',
  imports: [ProfileMenuComponent],
  templateUrl: './admin-tabs.component.html',
  styleUrl: './admin-tabs.component.css'
})
export class AdminTabsComponent {
  activeTab: string = 'admin-dashboard'; // Default to dashboard
  userName: string="";
  userEmail:string="";
  constructor(private router: Router) {}

  switchTab(tabRoute: string) {
    this.activeTab = tabRoute;
    this.router.navigate([tabRoute]); // Navigate to main tab route

  }

}
