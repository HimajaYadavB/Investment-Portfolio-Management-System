import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { DataTransferService } from '../../services/data-transfer.service';
import { ImportService } from '../../services/import.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../../material-design/material-design.module';

@Component({
  selector: 'app-import',
  imports: [CommonModule, MaterialDesignModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css',
  standalone: true
})
export class ImportComponent {
  constructor(private importService: ImportService, private dataService: DataTransferService, private router: Router){}
  handleFileUpload(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        console.log('Parsed Excel Data:', jsonData);
        //this.importAssets(jsonData); // Call your bulk insert logic
        // this.outerActions.emit({action:'import', data: jsonData});
        this.importService.emitImportedData(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }

  title='';
  backText: string = 'Back';
  backUrl: string = '/';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  this.dataService.getTitle().subscribe(title => this.title = title);
  this.dataService.getBackText().subscribe(text => this.backText = text);
  this.dataService.getBackUrl().subscribe(url => this.backUrl = url);
  }

  goBack(){
  this.router.navigate([this.backUrl]);
}
}
