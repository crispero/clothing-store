import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClothesModel } from "../../../models/clothes.model";
import { BrandModel } from "../../../models/brand.model";
import { GENDER_TYPE_LIST } from "../../../dto/gender-type";
import { CLOTHES_SIZE_LIST } from "../../../dto/clothes-size";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AttachmentRepository } from "../../../repositories/attachment.repository";
import { IClothesDto } from "../../../dto/clothes.dto";

export interface IClothesDialogData {
  title: string;
  clothes?: ClothesModel,
  brands: BrandModel[]
}

export interface IClothesDialogResponse {
  clothes: IClothesDto;
  file?: File;
  isDeletePicture?: boolean;
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
  public imageFile: File | undefined;
  public previewUrl: string;

  @Output() public changeEventData = new EventEmitter<ClothesModel>();

  constructor(
    private readonly attachmentRepository: AttachmentRepository,
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
        size: [clothes?.size || "", [Validators.required]],
        pictureUrl: [clothes?.pictureUrl || ""]
      });
    } catch (e) {
      console.log(e);
    }

    this.title = title;
    this.previewUrl = this.getFilePath(clothes?.pictureUrl);
  }

  setImageFile(file?: File): void {
    this.imageFile = file;
  }

  setPreviewUrl(value: string): void {
    this.previewUrl = value;
  }

  getFilePath(fileName?: string): string {
    return !!fileName ? this.attachmentRepository.getFilePath(fileName) : "";
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    const response: IClothesDialogResponse = {
      clothes: value,
      file: this.imageFile,
      isDeletePicture: this.isDeletePicture(),
    }
    this.dialogRef.close(response);
  }

  isDeletePicture(): boolean {
    const value = this.formGroup.value;
    return !!value?.pictureUrl && !this.imageFile && !this.previewUrl;
  }
}
