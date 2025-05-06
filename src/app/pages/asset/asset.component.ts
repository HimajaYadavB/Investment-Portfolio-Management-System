import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BuyAssetComponent } from '../buy-asset/buy-asset.component';

@Component({
  selector: 'app-asset',
  imports: [CommonModule, BuyAssetComponent],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css',
  standalone: true
})
export class AssetComponent {
  user: any = {}; // User details
  assets: any[] = []; // List of assets


  constructor(private dash: UserdashboardService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAssets();
  }

  goToBuyAsset() {
    this.router.navigate(['/buy-asset']);
  }
  goToSellAsset(asset: any) {
    this.router.navigate(['/sell-asset'], {
      queryParams: {
        portfolioName: asset.PortfolioName,
        assetName: asset.AssetName,
        assetType: asset.AssetType,
        assetID: asset.AssetID
      }
    });
  }
  

  fetchAssets(): void {
    this.dash.getassetservice().subscribe({
      next: (response) => {
        console.log('Assets Response:', response);
        this.user = response.user; // Set user details
        this.assets = response.assets; // Set asset list
      },
      error: (error) => {
        console.error('Error fetching assets:', error);
      }
    });
  }
}
