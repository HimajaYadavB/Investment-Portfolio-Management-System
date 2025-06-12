import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { Router, RouterModule } from '@angular/router';
import { FavLinksService } from '../../services/fav-links.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserdashboardService } from '../../services/userdashboard.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-favorites-config',
  imports: [CommonModule, MaterialDesignModule, RouterModule, FormsModule],
  templateUrl: './user-favorites-config.component.html',
  styleUrl: './user-favorites-config.component.css',
  standalone: true
})
export class UserFavoritesConfigComponent {
  favoriteLinks: any[] = [];
  selectedLink: any[] = [];
  unselectedLinks: any[] = [];
  userId!: number;
  searchTerm: string='';

  constructor(private favLinksService: FavLinksService, private router: Router, private dash: UserdashboardService,
    public dialogRef: MatDialogRef<UserFavoritesConfigComponent>
  ) {}

  ngOnInit(): void {
    this.userId =this.dash.getCurrentUser().UserID;
    this.favLinksService.getUnselectedFavorites(this.userId).subscribe(res => {
      this.unselectedLinks = res.favoriteLinks;
    });

    this.favLinksService.getFavouriteLinks(this.userId).subscribe({
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
  addToFavorites(link: any) {
    this.favoriteLinks.unshift(link);
    this.unselectedLinks = this.unselectedLinks.filter(l => l.Id !== link.Id);

    // Optional: Save immediately to DB
    this.favLinksService.markAsSelected(this.userId, link.Id).subscribe(() => {
      console.log(`${link.Label} marked as selected`);
    });
  }

  deleteFavorites(link: any) {
    this.favoriteLinks = this.favoriteLinks.filter(l=>l.Id!==link.Id);
    this.unselectedLinks.unshift(link);

    // Optional: Save immediately to DB
    this.favLinksService.deleteSelected(this.userId, link.Id).subscribe(() => {
      console.log(`${link.Label} marked as deleted`);
    });
  }
  get filteredUnselectedLinks() {
    if (!this.searchTerm) return this.unselectedLinks;
    const lower = this.searchTerm.toLowerCase();
    return this.unselectedLinks.filter(link =>
      link.Label.toLowerCase().includes(lower)
    );
  }
  @Output() close = new EventEmitter<boolean>();
  onSaveAndClose() {
    // this.router.navigate(['/user-dashboard']);
    // this.dialogRef.close(true);
    // this.close.emit(true);
    const orderedLinkIds = this.favoriteLinks.map(link => link.Id);
    this.favLinksService.updateOrderIndex(this.userId, orderedLinkIds).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
  onCancel(){
    this.dialogRef.close(false);
  }
  onSelectFavorite() {
     if (this.selectedLink.length > 0) {
      console.log("newwwwwwwww",this.selectedLink);
      const userId=this.dash.getCurrentUser().UserID;
    for (const link of this.selectedLink) {
      this.favLinksService.markAsSelected(userId,link.Id).subscribe(() => {
        console.log(`${link.Label} marked as selected`);
      });
    }

  this.router.navigate(['/user-dashboard']);
  }
  }

  selectedUnassignedLinks: any[] = [];

  toggleSelection(link: any) {
    const index = this.selectedUnassignedLinks.findIndex(l => l.Id === link.Id);
    if (index === -1) {
      this.selectedUnassignedLinks.push(link);
    } else {
      this.selectedUnassignedLinks.splice(index, 1);
    }
  }

  isSelected(link: any): boolean {
    return this.selectedUnassignedLinks.some(l => l.Id === link.Id);
  }

  assignedSelectedLinks: any[] = [];

// toggle for Assigned links
  toggleAssignedSelection(link: any) {
    const index = this.assignedSelectedLinks.findIndex(l => l.Id === link.Id);
    if (index === -1) {
      this.assignedSelectedLinks.push(link);
    } else {
      this.assignedSelectedLinks.splice(index, 1);
    }
  }

  isAssignedSelected(link: any): boolean {
    return this.assignedSelectedLinks.some(l => l.Id === link.Id);
  }

  moveUp() {
  const selectedIds = this.assignedSelectedLinks.map(link => link.Id);

  for (let i = 1; i < this.favoriteLinks.length; i++) {
    const current = this.favoriteLinks[i];
    const previous = this.favoriteLinks[i - 1];

    if (selectedIds.includes(current.Id) && !selectedIds.includes(previous.Id)) {
      // Swap if previous is not selected
      [this.favoriteLinks[i - 1], this.favoriteLinks[i]] = [this.favoriteLinks[i], this.favoriteLinks[i - 1]];
    }
  }
}


  moveDown() {
    for (let i = this.favoriteLinks.length - 2; i >= 0; i--) {
      const current = this.favoriteLinks[i];
      const next = this.favoriteLinks[i + 1];

      if (this.isAssignedSelected(current) && !this.isAssignedSelected(next)) {
        [this.favoriteLinks[i], this.favoriteLinks[i + 1]] = [this.favoriteLinks[i + 1], this.favoriteLinks[i]];
      }
    }
  }


  addSelectedLinks() {
    for (const link of this.selectedUnassignedLinks) {
      this.favoriteLinks.unshift(link);
      this.unselectedLinks = this.unselectedLinks.filter(l => l.Id !== link.Id);

      this.favLinksService.markAsSelected(this.userId, link.Id).subscribe(() => {
        console.log(`${link.Label} marked as selected`);
      });
    }
    this.selectedUnassignedLinks = []; // clear selection after adding
  }

  removeSelectedLinks() {
    for (const link of this.assignedSelectedLinks) {
      this.favoriteLinks = this.favoriteLinks.filter(l=>l.Id!==link.Id);
      //this.favoriteLinks.unshift(link);
      // this.unselectedLinks = this.unselectedLinks.filter(l => l.Id !== link.Id);
      this.unselectedLinks.unshift(link);

      this.favLinksService.deleteSelected(this.userId, link.Id).subscribe(() => {
        console.log(`${link.Label} marked as selected`);
      });
    }
    this.assignedSelectedLinks = []; // clear selection after adding
  }


}
