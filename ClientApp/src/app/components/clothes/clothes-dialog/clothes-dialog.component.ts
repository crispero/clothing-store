import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClothesModel } from "../../../models/clothes.model";
import { BrandModel } from "../../../models/brand.model";
import { BrandRepository } from "../../../repositories/brand.repository";

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
    const clothes = this.dialogData?.clothes;

    this.brandList = await this.brandRepository.getAll();

    this.currentBrand = clothes?.brandId ? await this.brandRepository.getById(clothes.brandId) : null;

    this.formGroup = this.formBuilder.group({
      name: [clothes?.name || "", [Validators.required]],
      brandName: [this.currentBrand?.name || "", [Validators.required]],
      description: [clothes?.description || "", [Validators.required]],
      price: [clothes?.price || "", [Validators.required]],
      color: [clothes?.color || "", [Validators.required]],
      genderType: [clothes?.genderType || "", [Validators.required]]
    });

    this.title = this.dialogData.title;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    this.dialogRef.close(value);
  }
}
