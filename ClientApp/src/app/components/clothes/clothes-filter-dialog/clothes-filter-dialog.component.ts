import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CLOTHES_SIZE_LIST } from "../../../dto/clothes-size";
import { GENDER_TYPE_LIST } from "../../../dto/gender-type";

export interface IClothesFilterDialogData {
  title: string;
}

@Component({
  selector: 'app-clothes-filter-dialog',
  templateUrl: './clothes-filter-dialog.component.html',
  styleUrls: ['./clothes-filter-dialog.component.scss']
})
export class ClothesFilterDialogComponent implements OnInit {
  public genderTypeList = GENDER_TYPE_LIST;
  public sizeList = CLOTHES_SIZE_LIST;
  public title: string;
  public formGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ClothesFilterDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IClothesFilterDialogData,
  ) { }

  ngOnInit(): void {
    const { title } = this.dialogData;

    this.formGroup = this.formBuilder.group({
      genderType: [""],
      size: [""],
    });

    this.title = title;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    console.log(value);
    this.dialogRef.close(value);
  }

}
