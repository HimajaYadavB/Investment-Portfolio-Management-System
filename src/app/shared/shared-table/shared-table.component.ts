import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPaginatorComponent } from '../../pages/custom-paginator/custom-paginator.component';
import { MaterialDesignModule } from '../../material-design/material-design.module';
import { ExportButtonComponent } from '../../pages/export-button/export-button.component';
import { TableSortService } from '../../services/table-sort.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeColumnsOrderComponent } from '../../pages/change-columns-order/change-columns-order.component';
import { ColOrderService } from '../../services/col-order.service';
import { UserdashboardService } from '../../services/userdashboard.service';

@Component({
  selector: 'app-shared-table',
  imports: [CommonModule, FormsModule, CustomPaginatorComponent, MaterialDesignModule, ExportButtonComponent, ChangeColumnsOrderComponent],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.css'
})
export class SharedTableComponent {
  constructor(private sortService: TableSortService, private router: Router, private dialog: MatDialog, private colOrderService: ColOrderService, private dash: UserdashboardService) {} // Assuming sortService is injected for sorting functionality
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  
  @Input() pageSize = 5;
  @Input() totalItems = 0;
  @Input() pageIndex = 0;
  @Input() inputFileName = '';
  @Input() tableName = '';

  // @Output() action = new EventEmitter<{ type: string; row: any }>();
  @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  originalColumns: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileInput') fileInput!:any;

  ngOnChanges() {
    this.dataSource.data = this.data;
    const columnNames = this.columns.map(c => c.name);

    if(this.originalColumns.length === 0){
      this.originalColumns = [...columnNames]
    }
   const user = this.dash.getCurrentUser();
    const userId = user.UserID;
   console.log('id, tname', userId, this.tableName);
   
    if (userId && this.tableName) {
      console.log("inside cond");
      this.colOrderService.getColOrderService(userId, this.tableName).subscribe(savedOrder => {
        const finalOrder = savedOrder?.length ? savedOrder : columnNames;
        this.displayedColumns = ['select', 'actions', ...finalOrder];
        console.log("Dis col", this.displayedColumns);
      });
    } else {
      this.displayedColumns = ['select', 'actions', ...columnNames];
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // triggerAction(type: string, row: any) {
  //   this.action.emit({ type, row });
  // }

  onPageChange(event: any) {
    this.selection.clear();
    this.pageChange.emit(event);
  }


  @Input() showBulkActionDropdown: boolean = false;
  @Output() bulkAction = new EventEmitter<{action: string, selected: any[]}>();

  onBulkActionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value) {
      this.bulkAction.emit({ action: value, selected: this.selection.selected });
    }
  }
  openDialog(){
    const dialogRef = this.dialog.open(ChangeColumnsOrderComponent,{
      width: '500px',
      panelClass: 'flat-dialog',
      data: {
        currentColumns: this.displayedColumns.filter(col=> col !=='select' && col !== 'actions'),
        originalColumns: this.originalColumns
      }
    });
    dialogRef.afterClosed().subscribe((result: string[] | null)=>{
      if(result){
        this.displayedColumns = ['select','actions', ...result];
        const user = this.dash.getCurrentUser();
        const userId = user.UserID;
        if (userId && this.tableName) {
          this.colOrderService.setColOrderService(userId, this.tableName, result)
            .subscribe(() => {
              console.log('Column order saved');
            });
        }
      }
    });
  }

  @Input() showOuterActions = false;
  @Output() outerActions = new EventEmitter<{action: string, data?: any}>();
  showFileUpload: boolean=false;

  onOuterActionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'import') {
      // this.showFileUpload=true;
      // this.fileInput.nativeElement.click();
      //this.router.navigate(['/import-page']);
      this.outerActions.emit({action: value});
    }
    else{
      this.showFileUpload=false;
      this.outerActions.emit({ action: value });
    }
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
  console.log('Sort result:', result);
  this.currentSortDirection = result.newDirection;
  this.currentSortColumn = result.newColumn;
  }

  getSortIcon(column: string): string {
  return this.sortService.getSortIcon(column, this.currentSortColumn, this.currentSortDirection);
  }

  @Output() edit = new EventEmitter<any>();
  @Output() details = new EventEmitter<any>();

  onEdit(row: any) {
    console.log("Edit clicked");
    //this.edit.emit(row);
  }

  onDetails(row: any) {
    this.details.emit(row);
  }


}
