import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BrandModel } from "../../../models/brand.model";
import { IBrandDto } from "../../../dto/brand.dto";
import { AttachmentRepository } from "../../../repositories/attachment.repository";

export interface IBrandDialogData {
  title: string;
  brand?: BrandModel;
}

export interface IBrandDialogResponse {
  brand: Partial<IBrandDto>;
  file?: File;
  isDeletePicture?: boolean;
}

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent implements OnInit {
  public title: string;
  public formGroup: FormGroup;
  public imageFile: File | undefined;
  public previewUrl: string;

  constructor(
    private dialogRef: MatDialogRef<BrandDialogComponent>,
    private formBuilder: FormBuilder,
    private attachmentRepository: AttachmentRepository,
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
    this.previewUrl = this.getFilePath(brand?.logoUrl);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    const response: IBrandDialogResponse = {
      isDeletePicture: this.isDeletePicture(),
      file: this.imageFile,
      brand: value,
    }
    this.dialogRef.close(response);
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

  isDeletePicture(): boolean {
    const value = this.formGroup.value;
    return !!value?.logoUrl && !this.imageFile && !this.previewUrl;
  }
}
