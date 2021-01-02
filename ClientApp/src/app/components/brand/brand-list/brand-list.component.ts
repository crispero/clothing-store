import { Component, OnInit } from '@angular/core';
import { BrandModel } from "../../../models/brand.model";
import { MatDialog } from "@angular/material/dialog";
import { BrandRepository } from "../../../repositories/brand.repository";
import { BrandDialogComponent, IBrandDialogData } from "../brand-dialog/brand-dialog.component";
import { IBrandDto } from "../../../dto/brand.dto";
import { Id } from "../../../models/id";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  public brands: BrandModel[];

  constructor(
    private readonly brandRepository: BrandRepository,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.brands = await this.brandRepository.getAll();
  }

  openBrandDialog(): void {
    const data: IBrandDialogData = { title: "Добавление бренда" };
    const dialogRef = this.dialog.open(BrandDialogComponent, { data, autoFocus: false });

    dialogRef.afterClosed().subscribe(async (brandDto: Partial<IBrandDto>) => {
      if (!!brandDto) {
        const newBrand = await this.brandRepository.create(brandDto);
        this.brands.push(newBrand);
      }
    });
  }

  onEditBrand(changes: Partial<IBrandDto>): void {
    this.brandRepository.update(<string>changes.brandId, changes);
  }

  async onDeleteBrand(id: Id): Promise<void> {
    const isDeleted = await this.brandRepository.delete(id);
    isDeleted && (this.brands = await this.brandRepository.getAll());
  }
}
