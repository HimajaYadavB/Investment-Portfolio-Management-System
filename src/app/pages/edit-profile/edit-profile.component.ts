import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserdashboardService } from '../../services/userdashboard.service';
import { ProfileServiceService } from '../../services/profile-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { EidtLogoutComponent } from '../eidt-logout/eidt-logout.component';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule, MaterialDesignModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
  standalone: true
})
export class EditProfileComponent {
 user = {
    firstName: '',
    lastName: '',
    phone: ''
  };


  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private userService: UserdashboardService,
    private profileService: ProfileServiceService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    this.user = {
      firstName: currentUser.FirstName,
      lastName: currentUser.LastName,
      phone: currentUser.PhoneNumber
    };
    console.log('usererrr', this.user);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const userId = this.userService.getCurrentUser().UserID;
    console.log('user inside save', this.user);
    this.profileService.updateProfile(userId, this.user).subscribe({
      next: () => {
        this.dialogRef.close(true); 
      },
      error: (err: any) => {
        console.error("Failed to update profile", err);
      }
    });
    this.dialogRef.close();
  }
}
