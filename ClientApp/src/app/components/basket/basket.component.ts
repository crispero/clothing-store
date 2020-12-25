import { Component, OnInit } from '@angular/core';
import { ClothesModel } from "../../models/clothes.model";
import { BasketRepository } from "../../repositories/basket.repository";
import { ClothesRepository } from "../../repositories/clothes.repository";
import { CurrentUser } from "../../utils/current-user";
import { BasketModel } from "../../models/basket.model";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  private baskets: BasketModel[];
  public clothesList: ClothesModel[];

  constructor(
    private readonly basketRepository: BasketRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly currentUser: CurrentUser
  ) { }

  async ngOnInit(): Promise<void> {
    const currentUserId = this.currentUser.currentUserId;

    if (currentUserId) {
        const baskets = await this.basketRepository.getByUserId(currentUserId);
        const clothesIds = this.getClothesIds(baskets);
        this.clothesList = await this.clothesRepository.getByIds(clothesIds);
    }
  }

  private getClothesIds(baskets: BasketModel[]) {
    return baskets.map(basket => basket.clothesId);
  }
}
