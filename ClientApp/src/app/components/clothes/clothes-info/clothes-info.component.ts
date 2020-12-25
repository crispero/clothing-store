import { Component, OnInit } from '@angular/core';
import { Id } from "../../../models/id";
import { ActivatedRoute } from "@angular/router";
import { ClothesRepository } from "../../../repositories/clothes.repository";
import { BrandRepository } from "../../../repositories/brand.repository";
import { ClothesModel } from "../../../models/clothes.model";
import { BrandModel } from "../../../models/brand.model";
import { FavoriteRepository } from "../../../repositories/favorite.repository";
import { BasketRepository } from "../../../repositories/basket.repository";
import { CurrentUser } from "../../../utils/current-user";

@Component({
  selector: 'app-clothes-info',
  templateUrl: './clothes-info.component.html',
  styleUrls: ['./clothes-info.component.scss']
})
export class ClothesInfoComponent implements OnInit {
  public clothes: ClothesModel;
  public brand: BrandModel;
  private clothesId: Id;

  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly basketRepository: BasketRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly brandRepository: BrandRepository,
    private readonly activatedRoute: ActivatedRoute,
    private readonly currentUser: CurrentUser
  ) { }

  async ngOnInit(): Promise<void> {
    this.clothesId = this.activatedRoute.snapshot.params.id;

    if (this.clothesId) {
      this.clothes = await this.clothesRepository.getById(this.clothesId);
      console.log(this.clothes);
      this.brand = await this.brandRepository.getById(this.clothes.brandId);
      console.log(this.brand);
    }
  }

  addToFavorite(): void {
    const sendData = this.getSendData();

    this.favoriteRepository.create(sendData);
  }

  addToBasket(): void {
    const sendData = this.getSendData();

    this.basketRepository.create(sendData);
  }

  private getSendData() {
    const userId = this.currentUser.currentUserId;

    return {
      userId,
      clothesId: this.clothes.clothesId,
    }
  }
}
