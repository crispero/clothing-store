import { Component, OnInit } from '@angular/core';
import { ClothesModel } from "../../../models/clothes.model";
import { MatDialog } from "@angular/material/dialog";
import { ClothesDialogComponent, IClothesDialogData } from "../clothes-dialog/clothes-dialog.component";
import { IClothesDto } from "../../../dto/clothes.dto";
import { ClothesRepository } from "../../../repositories/clothes.repository";
import { GENDER_TYPE_LIST } from "../../../dto/gender-type";
import { ApplicationUtils } from "../../../utils/application.utils";
import {
  ClothesFilterDialogComponent,
  IClothesFilterDialogData
} from "../clothes-filter-dialog/clothes-filter-dialog.component";
import { IClothesFilterParams } from "../../../dto/clothes-filter-params";
import { CurrentUser } from "../../../utils/current-user";
import { CLOTHES_SIZE_LIST } from "../../../dto/clothes-size";
import { BrandRepository } from "../../../repositories/brand.repository";
import { BrandModel } from "../../../models/brand.model";
import { Id } from "../../../models/id";
import { FavoriteRepository } from "../../../repositories/favorite.repository";
import { BasketRepository } from "../../../repositories/basket.repository";
import { BasketModel } from "../../../models/basket.model";
import { FavoriteModel } from "../../../models/favorite.model";

@Component({
  selector: 'app-clothes-list',
  templateUrl: './clothes-list.component.html',
  styleUrls: ['./clothes-list.component.scss']
})
export class ClothesListComponent implements OnInit {
  public isAdmin: boolean = false;
  public clothesList: ClothesModel[] = [];
  public filterList: any[] = [];
  public filterParams: Partial<IClothesFilterParams> = { name: "" };
  public brands: BrandModel[] = [];
  private basketList: BasketModel[] = [];
  private favoriteList: FavoriteModel[] = [];

  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly basketRepository: BasketRepository,
    private readonly applicationUtils: ApplicationUtils,
    private dialog: MatDialog,
    private readonly currentUser: CurrentUser
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const currentUserId = this.currentUser.currentUserId;

      this.isAdmin = await this.currentUser.isAdmin();
      this.clothesList = await this.clothesRepository.getClothesWithParams();
      this.brands = await this.brandRepository.getAll();
      this.favoriteList = await this.favoriteRepository.getByUserId(currentUserId);
      this.basketList = await this.basketRepository.getByUserId(currentUserId);
    } catch (e) {
      console.log(e);
    }
  }

  public alreadyInFavorite(clothesId: Id): boolean {
    return this.favoriteList.some(favorite => favorite.clothesId === clothesId);
  }

  public alreadyInBasket(clothesId: Id): boolean {
    return this.basketList.some(basket => basket.clothesId === clothesId);
  }

  async addToBasket(clothesId: Id): Promise<void> {
    const basket = await this.basketRepository.create({ clothesId, userId: this.currentUser.currentUserId });
    this.basketList.push(basket);
  }

  async addToFavorite(clothesId: Id): Promise<void> {
    const favorite = await this.favoriteRepository.create({ clothesId, userId: this.currentUser.currentUserId });
    this.favoriteList.push(favorite);
  }

  openClothesDialog(): void {
    const data: IClothesDialogData = { title: "Добавление одежды", brands: this.brands };
    const dialogRef = this.dialog.open(ClothesDialogComponent, { data, autoFocus: false });

      dialogRef.afterClosed().subscribe(async (clothesDto: Partial<IClothesDto>) => {
      if (!!clothesDto) {
        const newClothes = await this.clothesRepository.create(clothesDto);
        this.clothesList.push(newClothes);
      }
    });
  }

  openFilterDialog(): void {
    const data: IClothesFilterDialogData = { title: "Фильтры" };
    const dialogRef = this.dialog.open(ClothesFilterDialogComponent, { data, autoFocus: false });

    dialogRef.afterClosed().subscribe(async (params: Partial<IClothesFilterParams>) => {
      this.filterList = [];
      this.filterParams = params;
      this.clearEmptyFields();
      this.filterParams && this.initFilterList();
      this.clothesList = await this.clothesRepository.getClothesWithParams(params || {});
    });
  }

  async onChangeSearchValue(value: string): Promise<void> {
    this.filterParams.name = value;
    this.clothesList = await this.clothesRepository.getClothesWithParams(this.filterParams);
  }

  private clearEmptyFields() {
    if (!this.filterParams) return;

    for (const [key, value] of Object.entries(this.filterParams)) {
      if (!value) {
        // @ts-ignore
        delete this.filterParams[key];
      }
    }
  }

  private initFilterList() {
    for (const [key, value] of Object.entries(this.filterParams)) {
      switch (key) {
        case "genderType":
          const gender = GENDER_TYPE_LIST.find(gen => gen.genderType.toString() === value?.toString());
          if (!gender) return;
          this.filterList.push(gender);
          break;
        case "size":
          const size = CLOTHES_SIZE_LIST.find(s => s.size.toString() === value?.toString());
          if (!size) return;
          this.filterList.push(size);
          break;
      }
    }
  }

  async deleteFromFilters(filter: any) {
    const index = this.filterList.findIndex(filt => filt === filter);

    if (index === -1) return;

    const item = this.filterList.find(filt => filt === filter);

    for (const key in item) {
      // @ts-ignore
      delete this.filterParams[key];
    }

    this.filterList.splice(index, 1);

    this.clothesList = await this.clothesRepository.getClothesWithParams(this.filterParams);
  }

  async onDeleteClothes(id: Id) {
    const isDeleted = await this.clothesRepository.delete(id);
    isDeleted && this.deleteClothes(id);
  }

  private deleteClothes(id: Id) {
    const index = this.clothesList.findIndex(clothes => clothes.clothesId === id);
    if (index === -1) return;
    this.clothesList.splice(index, 1);
  }

  async onUpdateClothes(updateDto: Partial<IClothesDto>) {
    const updatedClothes = await this.clothesRepository.update(updateDto.clothesId!, updateDto);
    const index = this.clothesList.findIndex(clothes => clothes.clothesId === updateDto.clothesId!);
    if (index === -1) return;

    this.clothesList.splice(index, 1, updatedClothes)
  }
}
