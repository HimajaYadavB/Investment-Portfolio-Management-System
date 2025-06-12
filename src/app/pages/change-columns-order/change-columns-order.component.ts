import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-columns-order',
  imports: [DragDropModule, CommonModule],
  templateUrl: './change-columns-order.component.html',
  styleUrl: './change-columns-order.component.css',
  standalone: true
})
export class ChangeColumnsOrderComponent {
currentOrder: string[] = [];
  originalOrder: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChangeColumnsOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentColumns: string[], originalColumns: string[] }
  ) {
    this.currentOrder = [...data.currentColumns];
    this.originalOrder = [...data.originalColumns];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.currentOrder, event.previousIndex, event.currentIndex);
  }

  save() {
    this.dialogRef.close(this.currentOrder);
  }

  restoreDefault() {
    this.currentOrder = [...this.originalOrder];
    this.dialogRef.close(this.currentOrder);
  }

  cancel() {
    this.dialogRef.close();
  }

  moveUp(index: number) {
    if (index > 0) {
      [this.currentOrder[index - 1], this.currentOrder[index]] =
        [this.currentOrder[index], this.currentOrder[index - 1]];
    }
  }

  moveDown(index: number) {
    if (index < this.currentOrder.length - 1) {
      [this.currentOrder[index + 1], this.currentOrder[index]] =
        [this.currentOrder[index], this.currentOrder[index + 1]];
    }
  }

}
