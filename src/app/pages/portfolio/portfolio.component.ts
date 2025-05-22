import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TableSortService } from '../../services/table-sort.service';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { CustomPaginatorComponent } from '../custom-paginator/custom-paginator.component';
import { ExportButtonComponent } from '../export-button/export-button.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, MaterialDesignModule, CustomPaginatorComponent, ExportButtonComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
  
})
export class PortfolioComponent {
  email: string = '';
  portfolios: any[] = []; 
  user: any = {};
  activeTab: string = 'home'

  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = ['select', 'PortfolioName', 'PortfolioType', 'DateCreated', 'AssetCount'];
  
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dash: UserdashboardService, private router: Router, private sortService: TableSortService){
  
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
        
        this.getp();
      
    }

    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('Sort instance:', this.sort);
    }
    totalItems: number = 0;
    getp(){
      this.email= this.dash.getEmailService();
      this.dash.getportfolioservice().subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.portfolios = response.recordset;
          this.user = response.user;
          this.dataSource.data = response.recordset;
          this.totalItems = this.dataSource.data.length;  
        },
        error: (error) => {
          //alert('Unable to fetch the portfolios');
          console.error('Error:', error);
        }
      });
    }

    goToAdd(){
      this.router.navigate(['/add-portfolio'])
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

  this.displayedData = this.portfolios.slice(start, end);
  this.dataSource.data = this.displayedData;
}
}
