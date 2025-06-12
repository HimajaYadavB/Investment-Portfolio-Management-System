import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-portfolio',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './add-portfolio.component.html',
  styleUrl: './add-portfolio.component.css'
})
export class AddPortfolioComponent {
  portfolioName='';
  portfolioType='';
  userEmail='';
  portfolioTypes:any[]=[];

  constructor(private dash:UserdashboardService, private router: Router){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userEmail = this.dash.getEmailService();
    this.fetchPortfolioTypes();
  }

  
  fetchPortfolioTypes(){
    this.dash.getPortfolioTypeService().subscribe({
      next: (response)=>{
        
        this.portfolioTypes = response.portfolioTypes;
        console.log("Portfolio typoes",this.portfolioTypes)
      },
      error: (err)=>{
        console.log("Error", err);
      }
    })
  }

  addPortfolio(){
    const portfolioData={
      email:this.userEmail,
      portfolioName:this.portfolioName,
      portfolioType: this.portfolioType
    };
    this.dash.addPortfolioService(portfolioData).subscribe({
      next:(response)=>{
        alert('Portfolio Added Successfully')
        this.router.navigate(['/user-accounts/portfolios'])
      },
      error:(error)=>{
        console.log("Error adding portfolio", error);
      }
    })
  }

  goBack(){
    this.router.navigate(['/user-accounts/portfolios']);
  }

  importCSV(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result as string;
        console.log('CSV Content:', csvData);
        // TODO: Parse and use the CSV data as needed
      };
      reader.readAsText(file);
    }
  }
  
}
