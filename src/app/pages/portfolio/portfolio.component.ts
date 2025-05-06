import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  standalone: true
})
export class PortfolioComponent {
  email: string = '';
  portfolios: any[] = []; 
  user: any = {};
  activeTab: string = 'home'


  constructor(private dash: UserdashboardService, private router: Router){
  
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.

        this.getp();
      
    }

    getp(){
      this.email= this.dash.getEmailService();
      this.dash.getportfolioservice().subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.portfolios = response.recordset;
          this.user = response.user;
        },
        error: (error) => {
          //alert('Unable to fetch the portfolios');
          console.error('Error:', error);
        }
      });
    }

    goToAdd(){
      this.router.navigate(['/add-portfolio'])
    }
}
