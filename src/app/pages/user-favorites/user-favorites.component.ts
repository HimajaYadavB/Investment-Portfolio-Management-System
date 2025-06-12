import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserFavoritesConfigComponent } from '../user-favorites-config/user-favorites-config.component';
import { FavLinksService } from '../../services/fav-links.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserdashboardService } from '../../services/userdashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-favorites',
  imports: [CommonModule, MaterialDesignModule, RouterModule, UserFavoritesConfigComponent, FormsModule],
  templateUrl: './user-favorites.component.html',
  styleUrl: './user-favorites.component.css', 
  standalone: true
})
export class UserFavoritesComponent {
  favoriteLinks: any[] = [];
  constructor(private router: Router, private dialog: MatDialog, private favLinksService: FavLinksService, private dash: UserdashboardService){}
  
  ngOnInit(): void {
    console.log("UserFavoritesComponent loaded"); 
    const userId=this.dash.getCurrentUser().UserID;
    this.favLinksService.getFavouriteLinks(userId).subscribe({
      next: (res) => {
        console.log("API response:", res); 
        this.favoriteLinks = res.favoriteLinks;
        console.log("REssss", this.favoriteLinks);
      },
      error: (err) => {
        console.error("API error:", err); 
      }
    });
  }

onFavoriteSelect(link: any) {
  this.router.navigate([link.route]);
}
// openConfig() {
//     // this.dialog.open(UserFavoritesConfigComponent, {
//     //   width: '6000px'
//     // });
//     // this.router.navigate(['/user-fav-config']);
//   //   const dialogRef = this.dialog.open(UserFavoritesConfigComponent, {
//   //   width: '1500px',
//   //   height: '550px',
//   //   disableClose: true
//   // });

//   // dialogRef.afterClosed().subscribe((reload: boolean) => {
//   //   if (reload) {
//   //     const userId = this.dash.getCurrentUser().UserID;
//   //     this.favLinksService.getFavouriteLinks(userId).subscribe({
//   //       next: (res) => this.favoriteLinks = res.favoriteLinks,
//   //       error: (err) => console.error('Failed to reload favorites:', err)
//   //     });
//   //   }
//   // });
//   }



openConfig() {
  const dialogRef = this.dialog.open(UserFavoritesConfigComponent, {
    width: '74.05vw',               // responsive width
    maxWidth: '75vw',
    panelClass: 'flat-dialog1' // optional for custom CSS
  });

  dialogRef.afterClosed().subscribe((refresh: boolean) => {
    if (refresh) {
      const userId = this.dash.getCurrentUser().UserID;
      this.favLinksService.getFavouriteLinks(userId).subscribe({
        next: (res) => this.favoriteLinks = res.favoriteLinks,
        error: (err) => console.error('Failed to reload favorites:', err)
      });
    }
  });
}



}
