import { Component, OnInit } from '@angular/core';
import { FavoriteModel } from "../../models/favorite.model";
import { FavoriteRepository } from "../../repositories/favorite.repository";
import { ClothesModel } from "../../models/clothes.model";
import { ClothesRepository } from "../../repositories/clothes.repository";
import { CurrentUser } from "../../utils/current-user";
import { Id } from "../../models/id";
import { DialogConfirmComponent, IConfirmDialogData } from "../dialog-confirm/dialog-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { BasketModel } from "../../models/basket.model";
import { BasketRepository } from "../../repositories/basket.repository";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  private favorites: FavoriteModel[] = [];
  private basketList: BasketModel[] = [];
  public clothesList: ClothesModel[];

  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly basketRepository: BasketRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly currentUser: CurrentUser,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    const currentUserId = this.currentUser.currentUserId;

    if (currentUserId) {
      this.favorites = await this.favoriteRepository.getByUserId(currentUserId);
      const clothesIds = this.getClothesIds();
      this.clothesList = await this.clothesRepository.getByIds(clothesIds);
      this.basketList = await this.basketRepository.getByUserId(currentUserId);
    }
  }

  private getClothesIds() {
    return this.favorites.map(favorite => favorite.clothesId);
  }

  public alreadyInBasket(clothesId: Id): boolean {
    return this.basketList.some(basket => basket.clothesId === clothesId);
  }

  deleteFromFavorite(clothesId: Id): void {
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите убрать одежду из избранного?" };
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe(async (isApply: boolean) => {
      if (isApply) {
        const index = this.favorites.findIndex(bask => bask.clothesId === clothesId);
        if (index != -1) {
          const isDeleted = await this.favoriteRepository.delete(this.favorites[index].favoriteId);

          if (!isDeleted) return;

          this.favorites.splice(index, 1);

          const clothesIndex = this.clothesList.findIndex(clothes => clothes.clothesId === clothesId);
          if (clothesIndex === -1) return;

          this.clothesList.splice(clothesIndex, 1);
        }
      }
    })
  }

  async addToBasket(clothesId: Id): Promise<void> {
    const basket = await this.basketRepository.create({ clothesId, userId: this.currentUser.currentUserId });
    this.basketList.push(basket);
  }
}
