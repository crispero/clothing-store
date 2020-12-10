import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-clothes-dialog',
  templateUrl: './clothes-dialog.component.html',
  styleUrls: ['./clothes-dialog.component.scss']
})
export class ClothesDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ClothesDialogComponent>,
  ) { }

  ngOnInit(
  ): void {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    this.dialogRef.close();
  }
}
