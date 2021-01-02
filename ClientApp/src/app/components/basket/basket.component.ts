import { Component, OnInit } from '@angular/core';
import { ClothesModel } from "../../models/clothes.model";
import { BasketRepository } from "../../repositories/basket.repository";
import { ClothesRepository } from "../../repositories/clothes.repository";
import { CurrentUser } from "../../utils/current-user";
import { BasketModel } from "../../models/basket.model";
import { OrderRepository } from "../../repositories/order.repository";
import { IOrderDto } from "../../dto/order.dto";
import { MatDialog } from "@angular/material/dialog";
import { OrderDialogComponent } from "../order/order-dialog/order-dialog.component";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public clothesList: ClothesModel[];

  constructor(
    private readonly basketRepository: BasketRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly currentUser: CurrentUser,
    private readonly orderRepository: OrderRepository,
    private dialog: MatDialog
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

  openOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderDialogComponent,
      { data: {title: "Оформление заказа"}, autoFocus: false });

    dialogRef.afterClosed().subscribe(async (order: Partial<IOrderDto>) => {
      if (!!order) {
        order.clothesIds = this.clothesList.map(clothes => clothes.clothesId);
        await this.orderRepository.create(order);
        this.clothesList = [];
      }
    });
  }
}
