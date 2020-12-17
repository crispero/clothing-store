import { Component, Input, OnInit } from '@angular/core';
import { ClothesModel } from "../../../models/clothes.model";
import { FavoriteRepository } from "../../../repositories/favorite.repository";
import { BasketRepository } from "../../../repositories/basket.repository";
import { CurrentUser } from "../../../utils/CurrentUser";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-clothes-card',
  templateUrl: './clothes-card.component.html',
  styleUrls: ['./clothes-card.component.scss']
})
export class ClothesCardComponent implements OnInit {
  @Input() public clothes: ClothesModel;

  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly basketRepository: BasketRepository,
  ) { }

  ngOnInit(): void {
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
    const userId = CurrentUser.currentUserId;

    return {
      userId,
      clothesId: this.clothes.id,
    }
  }
}
