import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sell-asset',
  imports: [CommonModule, FormsModule],
  templateUrl: './sell-asset.component.html',
  styleUrl: './sell-asset.component.css',
  standalone:true
})
export class SellAssetComponent {
  portfolioName='';
  assetName='';
  assetID=0;
  assetType=''
  quantity=0;
  sellPrice=0;
  brokers:any[]=[];
  userEmail = '';
  brokerName='';


  constructor(private dash:UserdashboardService, private router: Router, private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userEmail = this.dash.getEmailService();
    this.fetchBrokers();
    this.route.queryParams.subscribe(params => {
      this.portfolioName = params['portfolioName'] || '';
      this.assetName = params['assetName'] || '';
      this.assetType = params['assetType'] || '';
      this.assetID = params['assetID'] || 0;
    });
  }

  fetchBrokers(){
    this.dash.getBrokersService().subscribe({
      next: (response)=>{
        this.brokers = response.brokers;
      },
      error: (error)=>{
        console.log("Error",error)
      }
    });
  }

  sellAsset(){
    const info={
      email: this.userEmail,
      portfolioName: this.portfolioName,
      assetID:this.assetID,
      assetName: this.assetName,
      quantity: this.quantity,
      sellPrice: this.sellPrice,
      brokerName: this.brokerName,
    }

    this.dash.sellAssetService(info).subscribe({
      next: (response)=>{
        console.log('Selling asset...', response);
          alert('Stock sold successfully!');
          this.router.navigate(['/user-asset']);
      },
      error: (err)=>{
        console.log("Error",err)
      }
    })
  }
}
