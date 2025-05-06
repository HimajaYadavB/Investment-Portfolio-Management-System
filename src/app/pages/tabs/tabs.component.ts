import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, ProfileMenuComponent],
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  activeTab: string = 'user-dashboard'; // Default to dashboard
  activeSubTab: string = 'user-dividend';
  userName: string="";
  userEmail: string="";

  constructor(private router: Router) {}

  switchTab(tabRoute: string) {
    this.activeTab = tabRoute;
    this.activeSubTab = '';
  
    this.router.navigate([tabRoute]); // Now go to /user-payments directly
  }
  

}