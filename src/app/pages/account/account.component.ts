import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  constructor(private router:Router){}
  activeTab: string = '';
  switchTab(tabRoute: string) {
    this.router.navigate([tabRoute]); // Now go to /user-payments directly
  }
}
