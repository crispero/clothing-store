import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClothesModel } from "../../../models/clothes.model";
import { BrandModel } from "../../../models/brand.model";
import { GENDER_TYPE_LIST } from "../../../dto/gender-type";
import { CLOTHES_SIZE_LIST } from "../../../dto/clothes-size";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export interface IClothesDialogData {
  title: string;
  clothes?: ClothesModel,
  brands: BrandModel[]
}

@Component({
  selector: 'app-clothes-dialog',
  templateUrl: './clothes-dialog.component.html',
  styleUrls: ['./clothes-dialog.component.scss']
})
export class ClothesDialogComponent implements OnInit {
  public genderTypeList = GENDER_TYPE_LIST;
  public sizeList = CLOTHES_SIZE_LIST;
  public title: string;
  public formGroup: FormGroup;
  public currentBrand: BrandModel | undefined | null;
  public brandList: BrandModel[] = [];

  @Output() public changeEventData = new EventEmitter<ClothesModel>();

  constructor(
    private dialogRef: MatDialogRef<ClothesDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IClothesDialogData,
  ) { }

  async ngOnInit(
  ): Promise<void> {
    const { title, clothes, brands } = this.dialogData;

    try {

      this.brandList = brands;

      this.currentBrand = brands.find(brand => brand.brandId === clothes?.brandId);

      this.formGroup = this.formBuilder.group({
        name: [clothes?.name || "", [Validators.required]],
        brandId: [this.currentBrand?.brandId || "", [Validators.required]],
        description: [clothes?.description || "", [Validators.required]],
        price: [clothes?.price || "", [Validators.required]],
        color: [clothes?.color || "", [Validators.required]],
        genderType: [clothes?.genderType || "", [Validators.required]],
        size: [clothes?.size || "", [Validators.required]]
      });
    } catch (e) {
      console.log(e);
    }

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
