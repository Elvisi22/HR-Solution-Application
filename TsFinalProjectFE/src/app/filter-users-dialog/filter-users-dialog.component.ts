import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-users-dialog',
  templateUrl: './filter-users-dialog.component.html',
  styleUrls: ['./filter-users-dialog.component.scss']
})
export class FilterUsersDialogComponent {
  selectedFilter!: string;

  constructor(public dialogRef: MatDialogRef<FilterUsersDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(this.selectedFilter);
  }

}
