import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { CommonModule } from '@angular/common';
import { CustomPaginatorComponent } from '../custom-paginator/custom-paginator.component';
import { PortfoliosService } from '../../services/portfolios.service';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';
import { TableSortService } from '../../services/table-sort.service';
import { UserdashboardService } from '../../services/userdashboard.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { DataTransferService } from '../../services/data-transfer.service';
import { ImportService } from '../../services/import.service';

@Component({
  selector: 'app-approve-portfolio',
  imports: [FormsModule, MaterialDesignModule, CommonModule, CustomPaginatorComponent, SharedTableComponent],
  templateUrl: './approve-portfolio.component.html',
  styleUrl: './approve-portfolio.component.css'
})
export class ApprovePortfolioComponent {
portfolios: any[] = [];
  allPendingPortfolios: any[] = [];
  userPortfolios: any[] = [];
  displayedData: any[] = [];
  displayedData1: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  dataSource1 = new MatTableDataSource<any>([]);
  selection1 = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select','actions', 'PortfolioName', 'PortfolioType', 'DateCreated'];
  email='';
  user: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private admin: AdminService, private pservice: PortfoliosService, private dash: UserdashboardService, private router: Router, private dataService: DataTransferService, private importService: ImportService) {}

  ngOnInit(): void {
    this.loadPendingPortfolios();
    this.loadUserPortfolios();

    this.importService.importObservable.subscribe(event=>{
      if(event.action === 'import'){
        this.importPortfolios(event.data);
      }
    })
  }

  ngAfterViewInit(): void {
  }
  loadUserPortfolios(){
      this.email= this.dash.getEmailService();
      this.dash.getportfolioservice().subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.userPortfolios = response.recordset;
          this.user = response.user;
          this.dataSource1.data = response.recordset;
          this.totalItems1 = this.dataSource1.data.length;  
          this.updateDisplayedData1();
        },
        error: (error) => {
          //alert('Unable to fetch the portfolios');
          console.error('Error:', error);
        }
      });
  }

  loadPendingPortfolios() {
    const user = this.dash.getCurrentUser();
    const userId = user.UserID;
    console.log("userid",userId);
    this.pservice.getPendingPortfolios(userId).subscribe({
      next: (res) => {
        this.allPendingPortfolios = res.portfolios;
        this.totalItems = this.allPendingPortfolios.length;
        this.updateDisplayedData();
      },
      error: (err) => {
        console.error('Error loading portfolios:', err);
      }
    });
  }

  approve(portfolioId: number) {
    this.pservice.approvePortfolio(portfolioId).subscribe({
      next: () => {
        alert('Portfolio approved successfully!');
        this.loadPendingPortfolios();
      },
      error: () => {
        alert('Failed to approve portfolio.');
      }
    });
  }

  reject(portfolioId: number) {
    this.pservice.rejectPortfolio(portfolioId).subscribe({
      next: () => {
        alert('Portfolio rejected successfully!');
        this.loadPendingPortfolios();
      },
      error: () => {
        alert('Failed to reject portfolio.');
      }
    });
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
    this.displayedData = this.allPendingPortfolios.slice(start, end);
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
    this.displayedData1 = this.userPortfolios.slice(start, end);
    this.dataSource1.data = this.displayedData1;
  }

  pendingPortfolioColumns = [
    { name: 'PortfolioName', label: 'Portfolio Name', sortable: true },
    { name: 'PortfolioType', label: 'Type', sortable: true },
    { name: 'DateCreated', label: 'Date Created', sortable: true }
  ];
  userPortfolioColumns = [
    { name: 'PortfolioName', label: 'Portfolio Name', sortable: true },
    { name: 'PortfolioType', label: 'Type', sortable: true },
    { name: 'DateCreated', label: 'Date Created', sortable: true },
    { name: 'AssetCount', label: 'Total Assets', sortable: true }
  ];


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
    selected.forEach(p => this.approve(p.PortfolioID));
  } else if (action === 'reject') {
    console.log('Approving selected portfolios(par):', selected, action);
    selected.forEach(p => this.reject(p.PortfolioID));
  }
}


handleOuterAction(event: any) {
  const {action, data} = event;
  console.log('Outer action:', action);
  // console.log('Selected portfolios:', this.selected.length);
  // const selected = this.selection.selected;
  

  if (action === 'add') {
    console.log('Navigating to add portfolios');
    this.router.navigate(['/add-portfolio']);
  } else if (action === 'import') {
    console.log('Import');
    this.dataService.setDetailsData(null,[], 'Import Portfolios', 'Back to Portfolios', '/user-accounts/portfolios');
    // this.importPortfolios(data);
    this.router.navigate(['/import-page']);
  }
}

importPortfolios(portfolios: any[]){
const userId = this.dash.getCurrentUser().UserID;
  const portfoliosWithUser = portfolios.map(p => ({
    ...p,
    UserID: userId
  }));

  this.importService.importPortfolios(portfoliosWithUser).subscribe({
    next: () => {
      alert('Portfolios imported successfully!');
      this.loadPendingPortfolios();
    },
    error: () => {
      alert('Failed to import portfolios.');
    }
  });
}

goToEdit(row: any) {
  this.router.navigate(['/edit-path', row.id]); // Adjust as needed
}

showDetails(row: any) {
  console.log('Details:', row);
  const keysToDisplay = ['PortfolioName', 'PortfolioType', 'DateCreated'];
  const title = 'Pending Portfolios';
  const backText = 'Back to Portfolios'
  const url= '/user-accounts/portfolios'
  this.dataService.setDetailsData(row, keysToDisplay, title, backText, url);
  this.router.navigate(['/details']);
}

showDetails1(row: any) {
  console.log('Details:', row);
  const keysToDisplay = ['PortfolioName', 'PortfolioType', 'DateCreated', 'AssetCount'];
  const title = 'My Portfolios';
  const backText = 'Back to Portfolios'
  const url= '/user-accounts/portfolios'
  this.dataService.setDetailsData(row, keysToDisplay, title, backText, url);
  this.router.navigate(['/details']);
}



}
