import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface IConfirmDialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  public title: string;
  public description: string;

  constructor(
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: IConfirmDialogData
  ) { }

  ngOnInit(): void {
    this.title = this.dialogData.title || "";
    this.description = this.dialogData.description || "";
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }
}
