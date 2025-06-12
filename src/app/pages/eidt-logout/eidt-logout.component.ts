import { Component } from '@angular/core';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eidt-logout',
  imports: [MaterialDesignModule, EditProfileComponent],
  templateUrl: './eidt-logout.component.html',
  styleUrl: './eidt-logout.component.css',
  standalone: true
})
export class EidtLogoutComponent {
  constructor(private dialog:MatDialog, private router: Router, private dialogRef: MatDialogRef<EidtLogoutComponent>){

  }
  openEditProfile(){
    this.dialogRef.close();
    this.dialog.open(EditProfileComponent,{
      panelClass: 'flat-dialog'
    });
  }

  logout(){
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}
