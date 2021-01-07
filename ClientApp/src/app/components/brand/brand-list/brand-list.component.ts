import { Component, OnInit } from '@angular/core';
import { BrandModel } from "../../../models/brand.model";
import { MatDialog } from "@angular/material/dialog";
import { BrandRepository } from "../../../repositories/brand.repository";
import { BrandDialogComponent, IBrandDialogData, IBrandDialogResponse } from "../brand-dialog/brand-dialog.component";
import { IBrandDto } from "../../../dto/brand.dto";
import { Id } from "../../../models/id";
import { AttachmentRepository } from "../../../repositories/attachment.repository";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  public brands: BrandModel[];

  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly attachmentRepository: AttachmentRepository,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.brands = await this.brandRepository.getAll();
  }

  openBrandDialog(): void {
    const data: IBrandDialogData = { title: "Добавление бренда" };
    const dialogRef = this.dialog.open(BrandDialogComponent, { data, autoFocus: false });

    dialogRef.afterClosed().subscribe((response: IBrandDialogResponse) => {

    });
  }

  async updateBrand(response: IBrandDialogResponse): Promise<void> {
    const { brand, file, isDeletePicture } = response;

    if (!!file) {
      const createdFile = !!brand.logoUrl
        ? await this.attachmentRepository.updateFile(brand.logoUrl, file)
        : await this.attachmentRepository.uploadFile(file);
      brand.logoUrl = createdFile.path;
    } else if (!!isDeletePicture && !!brand.logoUrl) {
      await this.attachmentRepository.deleteFile(brand.logoUrl);
      brand.logoUrl = "";
    }

    if (!!brand) {
      const newBrand = await this.brandRepository.create(brand);
      this.brands.push(newBrand);
    }
  }

  onEditBrand(response: IBrandDialogResponse): void {
    this.updateBrand(response);
  }

  async onDeleteBrand(id: Id): Promise<void> {
    const isDeleted = await this.brandRepository.delete(id);
    isDeleted && (this.brands = await this.brandRepository.getAll());
  }
}
