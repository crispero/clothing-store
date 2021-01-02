import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrandModel } from "../../../models/brand.model";

export interface IBrandDialogData {
  title: string;
  brand?: BrandModel;
}

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent implements OnInit {
  public title: string;
  public formGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<BrandDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IBrandDialogData,
  ) { }

  ngOnInit(): void {
    const { brand, title } = this.dialogData;

    this.formGroup = this.formBuilder.group({
      name: [brand?.name || "", [Validators.required]],
      logoUrl: [brand?.logoUrl || ""],
      description: [brand?.description || "", [Validators.required]],
    });

    this.title = title;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    this.dialogRef.close(value);
  }
}
