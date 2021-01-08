import { Component, OnInit } from '@angular/core';
import { BrandModel } from "../../../models/brand.model";
import { MatDialog } from "@angular/material/dialog";
import { BrandRepository } from "../../../repositories/brand.repository";
import { BrandDialogComponent, IBrandDialogData, IBrandDialogResponse } from "../brand-dialog/brand-dialog.component";
import { Id } from "../../../models/id";
import { AttachmentRepository } from "../../../repositories/attachment.repository";
import { EntityUtils } from "../../../utils/entity.utils";

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
    private entityUtils: EntityUtils,
  ) { }

  async ngOnInit(): Promise<void> {
    this.brands = await this.brandRepository.getAll();
  }

  openBrandDialog(): void {
    const data: IBrandDialogData = { title: "Добавление бренда" };
    const dialogRef = this.dialog.open(BrandDialogComponent, { data, autoFocus: false });

    dialogRef.afterClosed().subscribe(async (response: IBrandDialogResponse) => {
      if (!response) return;

      await this.uploadFile(response);

      const { brand } = response;

      if (!!brand) {
        const createdBrand = await this.brandRepository.create(brand);
        this.entityUtils.replaceOrPushEntity(this.brands, createdBrand, "brandId");
      }
    });
  }

  async uploadFile(response: IBrandDialogResponse): Promise<void> {
    if (!response) return;

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
  }

  async onEditBrand(response: IBrandDialogResponse): Promise<void> {
    await this.uploadFile(response);

    const { brand } = response;

    if (!!brand) {
      const updatedBrand = await this.brandRepository.update(brand.brandId!, brand);
      this.entityUtils.replaceOrPushEntity(this.brands, updatedBrand, "brandId");
    }
  }

  async onDeleteBrand(id: Id): Promise<void> {
    const isDeleted = await this.brandRepository.delete(id);
    if (isDeleted) {
      this.entityUtils.deleteEntity(this.brands, id, "brandId");
    }
  }
}
