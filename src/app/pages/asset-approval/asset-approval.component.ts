import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminService } from '../../services/admin.service';
import { AssetsService } from '../../services/assets.service';
import { CommonModule } from '@angular/common';
import { CustomPaginatorComponent } from '../custom-paginator/custom-paginator.component';
import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { error } from 'console';
import { UserdashboardService } from '../../services/userdashboard.service';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';
import { Router } from '@angular/router';
import { DataTransferService } from '../../services/data-transfer.service';
import { ImportService } from '../../services/import.service';

@Component({
  selector: 'app-asset-approval',
  imports: [CommonModule, CustomPaginatorComponent, FormsModule, MaterialDesignModule, SharedTableComponent],
  templateUrl: './asset-approval.component.html',
  styleUrl: './asset-approval.component.css'
})
export class AssetApprovalComponent {
assets: any[] = [];
  pendingAssets: any[] = [];
  userAssets: any[] = [];
  displayedData: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedData1: any[] = [];
  dataSource1 = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'PortfolioName', 'AssetName', 'AssetType', 'Quantity', 'CurrentPrice','Actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aservice: AssetsService,private dash: UserdashboardService, private router: Router, private dataService: DataTransferService, private importService: ImportService) {}

  ngOnInit(): void {
    this.loadPendingAssets();
    this.loadUserAssets();

    this.importService.importObservable.subscribe(event=>{
      if(event.action === 'import'){
        this.importAssets(event.data);
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadPendingAssets() {
    const user = this.dash.getCurrentUser();
    const userId = user.UserID;
    console.log("userid",userId);
    this.aservice.getPendingAssets(userId).subscribe({
      next: (res) => {
        this.pendingAssets = res.assets;
        console.log(this.pendingAssets);
        this.totalItems = this.pendingAssets.length;
        this.updateDisplayedData();
      },
      error: (err) => {
        console.error('Error loading assets:', err);
      }
    });
  }
  email='';
  user: any;
  loadUserAssets(): void {
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
        this.userAssets = response.assets;
        this.totalItems1 = this.userAssets.length;

        this.updateDisplayedData1(); // ✅ always slice on fetch

      },
      error: (error) => {
        console.error('Error fetching assets:', error);
      }
    });
  }
  approve(assetId: number) {
    this.aservice.approveAsset(assetId).subscribe({
      next: () => {
        alert('Asset approved successfully!');
        this.loadPendingAssets();
      },
      error: () => {
        alert('Failed to approve asset.');
      }
    });
  }

  reject(assetId: number) {
    this.aservice.rejectAsset(assetId).subscribe({
      next: () => {
        alert('Asset rejected successfully!');
        this.loadPendingAssets();
      },
      error: (err) => {
        console.log("error", err);
        alert('Failed to reject asset.');
      }
    });
  }

  handleBulkAction(event: {action: string, selected: any[]}) {
  const {action, selected} = event;
  console.log('Bulk action:', action);
  // console.log('Selected portfolios:', this.selected.length);
  // const selected = this.selection.selected;
  if (!selected.length) {
    alert('Please select at least one item.');
    return;
  }

  if (action === 'approve') {
    console.log('Approving selected portfolios(par):', selected, action);
    selected.forEach(a => this.approve(a.AssetID));
  } else if (action === 'reject') {
    console.log('Approving selected portfolios(par):', selected, action);
    selected.forEach(a => this.reject(a.AssetID));
  }
}

handleOuterAction(event: any) {
  const {action, data} = event;
  console.log('Outer action:', action);
  // console.log('Selected portfolios:', this.selected.length);
  // const selected = this.selection.selected;
  

  if (action === 'add') {
    console.log('Navigating to add portfolios');
    this.router.navigate(['/buy-asset']);
  } else if (action === 'import') {
    console.log('Import');
    this.dataService.setDetailsData(null,[], 'Import Assets', 'Back to Assets', '/user-accounts/assets');
    // this.importPortfolios(data);
    this.router.navigate(['/import-page']);
    // this.importAssets(data);
  }
}

goToEdit(row: any) {
  this.router.navigate(['/edit-path', row.id]); // Adjust as needed
}


showDetails(row: any) {
  console.log('Details:', row);
  const keysToDisplay = ['PortfolioName', 'AssetName', 'AssetType', 'Quantity', 'CurrentPrice'];
  const title = 'Pending Assets';
  const backText = 'Back to Assets'
  const url= '/user-accounts/assets'
  this.dataService.setDetailsData(row, keysToDisplay, title, backText, url);
  this.router.navigate(['/details']);
}

showDetails1(row: any) {
  console.log('Details:', row);
  const keysToDisplay = ['PortfolioName', 'AssetName', 'AssetType', 'Quantity', 'CurrentPrice'];
  const title = 'My Assets';
  const backText = 'Back to Assets'
  const url= '/user-accounts/assets'
  this.dataService.setDetailsData(row, keysToDisplay, title, backText, url);
  this.router.navigate(['/details']);
}

  // Pagination
  totalItems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  handlePageChange(event: { pageIndex: number; pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedData = this.pendingAssets.slice(start, end);
    this.dataSource.data = this.displayedData;
  }

  totalItems1: number = 0;
  pageSize1: number = 5;
  pageIndex1: number = 0;

  handlePageChange1(event: { pageIndex: number; pageSize: number }) {
    this.pageIndex1 = event.pageIndex;
    this.pageSize1 = event.pageSize;
    this.updateDisplayedData1();
  }

  updateDisplayedData1() {
    const start = this.pageIndex1 * this.pageSize1;
    const end = start + this.pageSize1;
    this.displayedData1 = this.userAssets.slice(start, end);
    this.dataSource1.data = this.displayedData1;
  }
importAssets(assets: any[]){
const userId = this.dash.getCurrentUser().UserID;
  const assetsWithUser = assets.map(p => ({
    ...p,
    UserID: userId
  }));

  this.importService.importAssets(assetsWithUser).subscribe({
    next: () => {
      alert('Assets imported successfully!');
      this.loadPendingAssets();
    },
    error: () => {
      alert('Failed to import assets.');
    }
  });
}
  pendingAssetColumns = [
  { name: 'PortfolioName', label: 'Portfolio Name', sortable: true },
  { name: 'AssetName', label: 'Asset Name', sortable: true },
  { name: 'AssetType', label: 'Asset Type', sortable: true },
  { name: 'Quantity', label: 'Quantity', sortable: true },
  { name: 'CurrentPrice', label: 'Current Price', sortable: true }
];
  userAssetColumns = [
  { name: 'PortfolioName', label: 'Portfolio Name', sortable: true },
  { name: 'AssetName', label: 'Asset Name', sortable: true },
  { name: 'AssetType', label: 'Asset Type', sortable: true },
  { name: 'Quantity', label: 'Quantity', sortable: true },
  { name: 'CurrentPrice', label: 'Current Price', sortable: true }
];
}
