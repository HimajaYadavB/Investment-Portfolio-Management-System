import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividendDataService } from '../../services/dividend-data.service';
import { TableSortService } from '../../services/table-sort.service';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CustomPaginatorComponent } from '../custom-paginator/custom-paginator.component';
import { ExportButtonComponent } from '../export-button/export-button.component';
@Component({
  selector: 'app-port-div',
  standalone: true,
  imports: [CommonModule, MaterialDesignModule, CustomPaginatorComponent, ExportButtonComponent],
  templateUrl: './port-div.component.html',
  styleUrls:['./port-div.component.css']
})
export class PortDivComponent implements OnInit {
  constructor(private divService: DividendDataService, private sortService: TableSortService){

  }
  @Input() data: any[] = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns=['select','PortfolioName', 'PortfolioType', 'TotalDividendAmount'];
  divs: any[] = [];
totalItems: number = 0;
  ngOnInit(): void {
  // const interval = setInterval(() => {
  //   const data = this.divService.portfolioDividends;
  //   if (data && data.length > 0) {
  //     this.dataSource.data = data;
  //     this.divs = data;
  //     this.totalItems = this.dataSource.data.length;
  //     clearInterval(interval); // stop polling
  //   }
  // }, 100);
  this.dataSource.data=this.divService.portfolioDividends;
  this.divs=this.divService.portfolioDividends;
  this.totalItems = this.dataSource.data.length;
}


  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  currentSortColumn: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  sortData(column: string) {
    const result = this.sortService.applyCustomSort(
    this.dataSource,
    this.sort,
    column,
    this.currentSortColumn,
    this.currentSortDirection
  );

  this.currentSortDirection = result.newDirection;
  this.currentSortColumn = result.newColumn;
  }

  getSortIcon(column: string): string {
  return this.sortService.getSortIcon(column, this.currentSortColumn, this.currentSortDirection);
  }

      isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if not all are selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }


    pageSize = 5;
  pageIndex = 0;
  allData: any[] = [];             // Holds the full asset list
  displayedData: any[] = [];       // Holds current page data

allAssets: any[] = [];

handlePageChange(event: { pageIndex: number; pageSize: number }) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;

  this.updateDisplayedData(); // ✅ this will recalculate the current slice
}


updateDisplayedData() {
  const start = this.pageIndex * this.pageSize;
  const end = start + this.pageSize;

  this.displayedData = this.divs.slice(start, end);
  this.dataSource.data = this.displayedData;
}
}
