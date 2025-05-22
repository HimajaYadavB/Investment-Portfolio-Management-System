import { Component, ViewChild } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableSortService } from '../../services/table-sort.service';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { CustomPaginatorComponent } from '../custom-paginator/custom-paginator.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-get-taxes',
  imports: [CommonModule,MaterialDesignModule, CustomPaginatorComponent],
  standalone:true,
  templateUrl: './get-taxes.component.html',
  styleUrl: './get-taxes.component.css'
})
export class GetTaxesComponent {
  taxes: any[]=[];
  taxDataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort

  constructor(private dash:UserdashboardService, private sortService: TableSortService){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchTaxes();
  }
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this.taxDataSource.paginator=this.paginator;
  this.taxDataSource.sort=this.sort;
}
totalItems: number = 0;
taxeslist=[];
  fetchTaxes(){
    this.dash.getTaxesService().subscribe({
      next:(response)=>{
        this.taxDataSource.data=response.taxes;
        this.totalItems = this.taxDataSource.data.length;
        this.taxeslist=response.taxes;
      },
      error:(err)=>{
        console.log("Error",err);
      }
    })
  }

  applyFilter(filterValue: string) {
    this.taxDataSource.filter = filterValue.trim().toLowerCase();
  }
currentSortColumn: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  sortData(column: string) {
    const result = this.sortService.applyCustomSort(
    this.taxDataSource,
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

  this.displayedData = this.taxeslist.slice(start, end);
  this.taxDataSource.data = this.displayedData;
}
selection = new SelectionModel<any>(true, []);
    isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.taxDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if not all are selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.taxDataSource.data.forEach(row => this.selection.select(row));
  }
}
