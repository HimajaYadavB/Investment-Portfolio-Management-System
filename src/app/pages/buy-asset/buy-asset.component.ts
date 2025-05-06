import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { getUserDetails } from '../../../../server/getUser';
import { UserdashboardService } from '../../services/userdashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-asset',
  standalone: true,
  templateUrl: './buy-asset.component.html',
  styleUrls: ['./buy-asset.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BuyAssetComponent implements OnInit {

  portfolioName='';
  assetName='';
  assetType=''
  quantity=0;
  purchasePrice=0;
  brokers:any[]=[];
  portfolios: any[] = [];
  assetTypes: any[] = [];
  userEmail = '';
  brokerName='';


  constructor(private dash: UserdashboardService, private router: Router) {}

  ngOnInit(): void {
    this.userEmail = this.dash.getEmailService();
    this.fetchAssetTypes();
    this.fetchPortfolios();
    this.fetchBrokers();
  }

  fetchBrokers(){
    this.dash.getBrokersService().subscribe({
      next: (response)=>{
        this.brokers = response.brokers;
      },
      error: (err)=>{
        console.log("Error", err);
      }
    })
  }

  fetchAssetTypes(){
    this.dash.getAssetTypeService().subscribe({
      next: (response)=>{
        this.assetTypes = response.assetTypes;
      },
      error: (err)=>{
        console.log("Error", err);
      }
    })
  }

  fetchPortfolios(){
    this.dash.getportfolioservice().subscribe({
      next: (response)=>{
        this.portfolios = response.recordset
      },
      error: (err)=>{
        console.log("Error", err);
      }
    })
  }

  buyAssets() {
    
    const assetData = {
      email: this.userEmail,
      portfolioName: this.portfolioName,
      assetName: this.assetName,
      assetType: this.assetType,
      quantity: this.quantity,
      purchasePrice: this.purchasePrice,
      brokerName: this.brokerName,
    };
      this.dash.buyAssetService(assetData).subscribe({
        next: (response) => {
          console.log('Buying asset...', response);
          alert('Stock purchased successfully!');
          this.router.navigate(['/user-asset']);
          
        },
        error: (error) => {
          console.error('Error buying assets:', error);
          
        },
      });
    
  }

  goBack(){
    this.router.navigate(['/user-asset']);
  }



}
