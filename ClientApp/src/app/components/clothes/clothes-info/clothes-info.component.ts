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
import { CommentModel } from "../../../models/comment.model";
import { GENDER_TYPE_LIST, IGenderType } from "../../../dto/gender-type";
import { CLOTHES_SIZE_LIST, IClothesSize } from "../../../dto/clothes-size";
import { AppRoutesService } from "../../../routes/app-routes.service";
import { AttachmentRepository } from "../../../repositories/attachment.repository";

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
  public alreadyInBasket: boolean = false;
  public alreadyInFavorite: boolean = false;
  public genderType: IGenderType | undefined;
  public size: IClothesSize | undefined;
  public defaultAvatarName: string;

  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly basketRepository: BasketRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly brandRepository: BrandRepository,
    private readonly attachmentRepository: AttachmentRepository,
    private readonly activatedRoute: ActivatedRoute,
    private readonly currentUser: CurrentUser,
    private readonly appRoutesService: AppRoutesService
  ) { }

  async ngOnInit(): Promise<void> {
    this.clothesId = this.activatedRoute.snapshot.params.id;
    const currentUserId = this.currentUser.currentUserId;

    if (this.clothesId) {
      this.clothes = await this.clothesRepository.getById(this.clothesId);
      this.brand = await this.brandRepository.getById(this.clothes.brandId);
      this.genderType = GENDER_TYPE_LIST.find(gender => gender.genderType === this.clothes.genderType);
      this.size = CLOTHES_SIZE_LIST.find(size => size.size === this.clothes.size);
      this.alreadyInBasket = (await this.basketRepository.getByUserId(currentUserId)).some(basket => basket.clothesId.toString() === this.clothesId.toString());
      this.alreadyInFavorite = (await this.favoriteRepository.getByUserId(currentUserId)).some(favorite => favorite.clothesId.toString() === this.clothesId.toString());
    }

    this.defaultAvatarName = this.attachmentRepository.defaultAvatarName;
  }

  getFilePath(fileName?: string): string {
    const name = fileName || this.defaultAvatarName;
    return !!name ? this.attachmentRepository.getFilePath(name) : "";
  }

  async addToFavorite(): Promise<void> {
    const sendData = this.getSendData();

    await this.favoriteRepository.create(sendData);

    this.alreadyInFavorite = true;
  }

  async addToBasket(): Promise<void> {
    const sendData = this.getSendData();

    await this.basketRepository.create(sendData);

    this.appRoutesService.goToBasketPage();
  }

  private getSendData() {
    const userId = this.currentUser.currentUserId;

    return {
      userId,
      clothesId: this.clothes.clothesId,
    }
  }
}
