import { Component } from '@angular/core';
import { UserdashboardService } from '../../services/userdashboard.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BuyAssetComponent } from '../buy-asset/buy-asset.component';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { TableSortService } from '../../services/table-sort.service';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { CustomPaginatorComponent } from '../custom-paginator/custom-paginator.component';
import { ExportButtonComponent } from '../export-button/export-button.component';

@Component({
  selector: 'app-asset',
  imports: [CommonModule, BuyAssetComponent, MaterialDesignModule, CustomPaginatorComponent, ExportButtonComponent],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css',
  standalone: true
})
export class AssetComponent {
  user: any = {}; // User details
  assets: any[] = []; // List of assets
  
  selection = new SelectionModel<any>(true, []);

displayedColumns: string[] = ['select', 'PortfolioName', 'AssetName', 'AssetType', 'Quantity', 'CurrentPrice', 'DatePurchased', 'Sell'];

dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private dash: UserdashboardService, private router: Router, private sortService: TableSortService) {}

  ngOnInit(): void {
    this.fetchAssets();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    console.log("Sort instance:", this.sort);
  }
  goToBuyAsset() {
    this.router.navigate(['/buy-asset']);
  }
  goToSellAsset(asset: any) {
    this.router.navigate(['/sell-asset'], {
      queryParams: {
        portfolioName: asset.PortfolioName,
        assetName: asset.AssetName,
        assetType: asset.AssetType,
        assetID: asset.AssetID
      }
    });
  }
  
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  totalItems: number=0;
  fetchAssets(): void {
    this.dash.getassetservice().subscribe({
      next: (response) => {
        console.log('Assets Response:', response);
        // this.user = response.user; // Set user details
        // this.assets = response.assets; // Set asset list
        // this.dataSource.data = response.assets; // Set data to MatTableDataSource
        // this.allData = response.assets;
        // this.allAssets = response.assets;
        // this.dataSource.data = this.allAssets.slice(0, this.pageSize);

        // this.updateDisplayedData();
        this.user = response.user;
        this.allAssets = response.assets;
        this.totalItems = this.allAssets.length;

        this.updateDisplayedData(); // ✅ always slice on fetch

      },
      error: (error) => {
        console.error('Error fetching assets:', error);
      }
    });
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

  this.displayedData = this.allAssets.slice(start, end);
  this.dataSource.data = this.displayedData;
}


}
