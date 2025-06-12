import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { AssetComponent } from '../asset/asset.component';
import { DividendComponent } from '../dividend/dividend.component';
import { Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../tabs/tabs.component';
import { UserFavoritesComponent } from '../user-favorites/user-favorites.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, PortfolioComponent, AssetComponent,TabsComponent, RouterModule, DividendComponent, UserFavoritesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone:true
})
export class DashboardComponent {
  // email: string = '';
  // portfolios: any[] = []; 
  // username: string = '';
  // activeTab: string = 'dashboard'

  constructor(private dash: UserdashboardService, private router: Router){}

  
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //const userId = this.dash.getCurrentUser().UserID;
   
  }



  
  
}
