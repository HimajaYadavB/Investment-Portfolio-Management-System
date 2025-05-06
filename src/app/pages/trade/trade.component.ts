import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trade',
  imports: [RouterModule],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.css'
})
export class TradeComponent {
  constructor(private router:Router){}
  activeTab: string = '';
  switchTab(tabRoute: string) {
    this.router.navigate([tabRoute]); // Now go to /user-payments directly
  }
}
