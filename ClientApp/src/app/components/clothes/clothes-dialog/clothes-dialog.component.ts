import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClothesModel } from "../../../models/clothes.model";

export interface IClothesDialogData {
  title: string;
  clothes?: ClothesModel,
}

@Component({
  selector: 'app-clothes-dialog',
  templateUrl: './clothes-dialog.component.html',
  styleUrls: ['./clothes-dialog.component.scss']
})
export class ClothesDialogComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ClothesDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IClothesDialogData,
  ) { }

  ngOnInit(
  ): void {
    const clothes = this.dialogData.clothes;

    this.formGroup = this.formBuilder.group({
      name: [clothes?.name || "", [Validators.required]],
      description: [clothes?.description || "", [Validators.required]],
      price: [clothes?.price || "", [Validators.required]],
      color: [clothes?.color || "", [Validators.required]],
      genderType: [clothes?.genderType || "", [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    this.dialogRef.close(value);
  }
}
