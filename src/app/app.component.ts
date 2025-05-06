import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd  } from '@angular/router';
import { TabsComponent } from './pages/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { AdminTabsComponent } from './pages/admin-tabs/admin-tabs.component';
import { UserPaymentsComponent } from './pages/user-payments/user-payments.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule ,CommonModule, LoginComponent, TabsComponent, AdminTabsComponent, UserPaymentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true
})
export class AppComponent {
  title = 'investment-portfolio';

  showUserTabs = true;
  showAdminTabs = false;
  showPaymentTabs = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split('?')[0];

        if (
          url.startsWith('/user-dashboard') ||
          url.startsWith('/user-portfolio') ||
          url.startsWith('/user-asset') ||
          url.startsWith('/buy-asset') ||
          url.startsWith('/add-portfolio') ||
          url.startsWith('/sell-asset') ||
          url.startsWith('/user-payments') ||
          url.startsWith('/user-trade')  // <- covers dividends/taxes too!
        ) {  
          this.showUserTabs = true;
          this.showAdminTabs = false;
        } 
        else if (
          url.startsWith('/admin-dashboard') ||
          url.startsWith('/approve-brokers') ||
          url.startsWith('/add-dividends')
        ) {
          this.showUserTabs = false;
          this.showAdminTabs = true;
        } else {
          this.showUserTabs = false;
          this.showAdminTabs = false;
        }
        
      }
    });
  }
}
