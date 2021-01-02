import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClothesModel } from "../../../models/clothes.model";
import { BrandModel } from "../../../models/brand.model";
import { BrandRepository } from "../../../repositories/brand.repository";
import { GENDER_TYPE_LIST } from "../../../dto/gender-type";
import { CLOTHES_SIZE_LIST } from "../../../dto/clothes-size";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
  public genderTypeList = GENDER_TYPE_LIST;
  public sizeList = CLOTHES_SIZE_LIST;
  public title: string;
  public formGroup: FormGroup;
  public brandList: BrandModel[] = [];
  public currentBrand: BrandModel | null;

  @Output() public changeEventData = new EventEmitter<ClothesModel>();

  constructor(
    private brandRepository: BrandRepository,
    private dialogRef: MatDialogRef<ClothesDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IClothesDialogData,
  ) { }

  async ngOnInit(
  ): Promise<void> {
    const { title, clothes } = this.dialogData;

    try {
     // this.brandList = await this.brandRepository.getAll();

    //  this.currentBrand = clothes?.brandId ? await this.brandRepository.getById(clothes.brandId) : null;

      this.formGroup = this.formBuilder.group({
        name: [clothes?.name || "", [Validators.required]],
        brandName: [this.currentBrand?.name || "", [Validators.required]],
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
