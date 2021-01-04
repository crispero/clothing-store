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
import { CommentRepository } from "../../../repositories/comment.repository";
import { CommentModel } from "../../../models/comment.model";
import { GENDER_TYPE_LIST, IGenderType } from "../../../dto/gender-type";
import { CLOTHES_SIZE_LIST, IClothesSize } from "../../../dto/clothes-size";

@Component({
  selector: 'app-clothes-info',
  templateUrl: './clothes-info.component.html',
  styleUrls: ['./clothes-info.component.scss']
})
export class ClothesInfoComponent implements OnInit {
  public clothes: ClothesModel;
  public brand: BrandModel;
  public comments: CommentModel[];
  private clothesId: Id;
  public genderType: IGenderType | undefined;
  public size: IClothesSize | undefined;

  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly basketRepository: BasketRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly brandRepository: BrandRepository,
    private readonly activatedRoute: ActivatedRoute,
    private readonly currentUser: CurrentUser,
  ) { }

  async ngOnInit(): Promise<void> {
    this.clothesId = this.activatedRoute.snapshot.params.id;

    if (this.clothesId) {
      this.clothes = await this.clothesRepository.getById(this.clothesId);
      this.brand = await this.brandRepository.getById(this.clothes.brandId);
      this.genderType = GENDER_TYPE_LIST.find(gender => gender.genderType === this.clothes.genderType);
      this.size = CLOTHES_SIZE_LIST.find(size => size.size === this.clothes.size);
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
