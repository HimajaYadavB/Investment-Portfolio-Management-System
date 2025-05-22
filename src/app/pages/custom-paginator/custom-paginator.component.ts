import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent {
  @Input() totalItems = 0;
  @Input() pageSize = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input() pageIndex = 0;
  @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getEndIndex(): number {
    const end = (this.pageIndex + 1) * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  changePage(index: number) {
  if (index >= 0 && index < this.totalPages) {
    this.pageIndex = index;  // ✅ update current page index
    this.pageChange.emit({ pageIndex: index, pageSize: this.pageSize });
  }
}


  onPageSizeChange(size: number) {
    this.pageSize = +size; // ✅ update internal value
    this.pageIndex = 0;     // optional: reset page
    this.pageChange.emit({ pageIndex: 0, pageSize: +size });
  }

  getVisiblePages(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i);
}

}
