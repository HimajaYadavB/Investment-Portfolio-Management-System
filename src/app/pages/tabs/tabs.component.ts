import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { filter } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, ProfileMenuComponent, MatToolbarModule,MatMenuModule],
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  activeTab: string = '';
  dropdownTab: string | null = null;
  userName = '';
  userEmail = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.setActiveTabFromUrl(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveTabFromUrl(event.urlAfterRedirects);
      });
  }

  private setActiveTabFromUrl(url: string) {
    if (url.startsWith('/user-trade')) {
      this.activeTab = 'user-trade';
    } else if (url.startsWith('/user-payments')) {
      this.activeTab = 'user-payments';
    } else if (url.startsWith('/user-dashboard')) {
      this.activeTab = 'user-dashboard';
    } else if (url.startsWith('/user-portfolios')) {
      this.activeTab = 'user-portfolios';
    } else {
      this.activeTab = ''; // fallback
    }
  }

  toggleDropdown(tabName: string) {
    console.log("Toggling dropdown for", tabName);
    this.dropdownTab = this.dropdownTab === tabName ? null : tabName;
  }

  switchTab(path: string) {
    this.dropdownTab = null;
    this.router.navigate([path]);
  }

}
