import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserdashboardService } from '../../services/userdashboard.service';
import { DividendDataService } from '../../services/dividend-data.service';

@Component({
  selector: 'app-dividend',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.css']
})
export class DividendComponent {
  pdiv: any[] = [];
  adiv: any[] = [];

  constructor(private dash: UserdashboardService, private divService: DividendDataService) {}

  ngAfterContentInit(): void {
    this.fetchDiv();
  }

  fetchDiv(){
    this.dash.getDividendService().subscribe({
      next: (res) => {
        this.divService.portfolioDividends = res.Pdividend;
        this.divService.assetDividends = res.Adividend;
      },
      error: (err) => {
        console.error('Error fetching dividends:', err);
      }
    });
  }
}
