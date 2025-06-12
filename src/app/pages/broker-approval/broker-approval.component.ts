import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { ExportButtonComponent } from '../export-button/export-button.component';
import { CustomPaginatorComponent } from '../custom-paginator/custom-paginator.component';
import { TableSortService } from '../../services/table-sort.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-broker-approval',
  imports: [FormsModule, CommonModule, MaterialDesignModule, ExportButtonComponent, CustomPaginatorComponent],
  templateUrl: './broker-approval.component.html',
  styleUrl: './broker-approval.component.css'
})
export class BrokerApprovalComponent {
  brokers: any[] = [];
  allBrokers: any[] = [];
  displayedData: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select','BrokerName', 'Email', 'LicenseNumber', 'Actions'];
    selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private admin: AdminService, private sortService: TableSortService) {}

  ngOnInit(): void {
    this.loadBrokers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadBrokers() {
    this.admin.adminGetPendingBrokers().subscribe({
      next: (res) => {
        this.allBrokers = res.brokers;
        this.totalItems = this.allBrokers.length;
        this.updateDisplayedData();
      },
      error: (err) => {
        console.error('Error loading brokers:', err);
      }
    });
  }

  approve(brokerId: number) {
    this.admin.approveBroker(brokerId).subscribe({
      next: () => {
        alert('Broker approved successfully!');
        this.loadBrokers();
      },
      error: () => {
        alert('Failed to approve broker.');
      }
    });
  }

  reject(brokerId: number) {
    this.admin.rejectBroker(brokerId).subscribe({
      next: () => {
        alert('Broker rejected successfully!');
        this.loadBrokers();
      },
      error: () => {
        alert('Failed to reject broker.');
      }
    });
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
    this.displayedData = this.allBrokers.slice(start, end);
    this.dataSource.data = this.displayedData;
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

}