import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent {
  @Input() userName: string = 'User Name';
  @Input() userEmail: string = 'user@example.com';

  //showDropdown: boolean = false;

  constructor(private router: Router) {}

  showModal = false;

openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
