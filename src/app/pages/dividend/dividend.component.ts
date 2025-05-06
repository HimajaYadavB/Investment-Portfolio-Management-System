import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dividend',
  imports: [CommonModule],
  templateUrl: './dividend.component.html',
  styleUrl: './dividend.component.css'
})
export class DividendComponent {
  adiv: any[] = []; 
  pdiv: any[] = []; 
  user: any = {};

  constructor(private dash:UserdashboardService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getd();
  }

  getd(){
    this.dash.getDividendService().subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.adiv = response.Adividend;
        this.pdiv = response.Pdividend;
        this.user = response.user;
      },
      error: (error) => {
        //alert('Unable to fetch the portfolios');
        console.error('Error:', error);
      }
    });
  }
}
