import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { MaterialDesignModule } from '../../material-design/material-design.module';

@Component({
  selector: 'app-export-button',
  imports: [MaterialDesignModule],
  templateUrl: './export-button.component.html',
  styleUrl: './export-button.component.css',
  standalone: true
})
export class ExportButtonComponent {
 @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() fileName: string = '';

  exportSelected() {
    if (!this.data || this.data.length === 0) {
    alert('Please select at least one row to export.');
    return;
  }
    const exportData = this.data.map(row => {
      const filtered: any = {};
      this.columns
      .filter(col => col !== 'select' && col !== 'Sell') // remove 'select'
      .forEach(col => filtered[col] = row[col]);
      return filtered;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SelectedData');
    XLSX.writeFile(workbook, `${this.fileName}.xlsx`);
  }
}
