import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-get-taxes',
  imports: [CommonModule, FormsModule],
  standalone:true,
  templateUrl: './get-taxes.component.html',
  styleUrl: './get-taxes.component.css'
})
export class GetTaxesComponent {
  taxes: any[]=[];

  constructor(private dash:UserdashboardService){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchTaxes();
  }

  fetchTaxes(){
    this.dash.getTaxesService().subscribe({
      next:(response)=>{
        this.taxes=response.taxes;
      },
      error:(err)=>{
        console.log("Error",err);
      }
    })
  }


}
