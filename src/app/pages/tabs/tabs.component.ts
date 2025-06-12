import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { filter } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { UserdashboardService } from '../../services/userdashboard.service';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { MatDialog } from '@angular/material/dialog';
import { EidtLogoutComponent } from '../eidt-logout/eidt-logout.component';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, ProfileMenuComponent, MatToolbarModule,MatMenuModule, MaterialDesignModule, EidtLogoutComponent],
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  
})
export class TabsComponent implements OnInit {
  activeTab: string = '';
  dropdownTab: string | null = null;
  userName = '';
  userEmail = '';
  userID = '';

  constructor(private router: Router, private dash: UserdashboardService, private dialog: MatDialog) {}

  ngOnInit() {
    this.setActiveTabFromUrl(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveTabFromUrl(event.urlAfterRedirects);
      });

      const user = this.dash.getCurrentUser();
      const userId = user.FirstName;
      this.userID = userId;
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
    }else if (url.startsWith('/user-accounts')) {
      this.activeTab = 'user-accounts'; 
    }else {
      this.activeTab = ''; 
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

  openD1(){
    const dialogRef = this.dialog.open(EidtLogoutComponent, {
      position: {top: '80px', right: '10px'},
      panelClass: 'flat-dialog'
    });
  }

}
