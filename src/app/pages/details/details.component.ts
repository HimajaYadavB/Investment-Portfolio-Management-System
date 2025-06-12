import { Component, Input } from '@angular/core';
import { DataTransferService } from '../../services/data-transfer.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { MaterialDesignModule } from '../../material-design/material-design.module';

@Component({
  selector: 'app-details',
  imports: [CommonModule, MaterialDesignModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  standalone: true
})
export class DetailsComponent {
  rowData: any;

  constructor(private dataService: DataTransferService, private router: Router) {}

  portfolioData: any;
  displayKeys: string[]=[];
  title: string='';
  backText: string = 'Back';
  backUrl: string = '/'; 

ngOnInit() {
  this.portfolioData = this.dataService.getDetailsData();
  this.displayKeys = this.dataService.getDisplayKeys() ?? [];
  this.dataService.getTitle().subscribe(title => this.title = title);
  this.dataService.getBackText().subscribe(text => this.backText = text);
  this.dataService.getBackUrl().subscribe(url => this.backUrl = url);
  
}

// @Input() backText: string = 'Back'; // will be passed by parent
// @Input() backUrl: string = '/';     // default route

goBack(){
  this.router.navigate([this.backUrl]);
}
formatLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // insert space before capital letters
    .replace(/^./, str => str.toUpperCase()); // capitalize first letter
}

}
