import { Component, OnInit } from '@angular/core';
import { FavoriteModel } from "../../models/favorite.model";
import { FavoriteRepository } from "../../repositories/favorite.repository";
import { ClothesModel } from "../../models/clothes.model";
import { ClothesRepository } from "../../repositories/clothes.repository";
import { CurrentUser } from "../../utils/current-user";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  private favorites: FavoriteModel[];
  public clothesList: ClothesModel[];

  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly currentUser: CurrentUser
  ) { }

  async ngOnInit(): Promise<void> {
    const currentUserId = this.currentUser.currentUserId;

    if (currentUserId) {
      this.favorites = await this.favoriteRepository.getByUserId(currentUserId);
      const clothesIds = this.getClothesIds();
      this.clothesList = await this.clothesRepository.getByIds(clothesIds);
    }
  }

  private getClothesIds() {
    return this.favorites.map(favorite => favorite.clothesId);
  }
}
