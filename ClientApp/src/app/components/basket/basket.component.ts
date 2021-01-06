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
import { DialogConfirmComponent, IConfirmDialogData } from "../dialog-confirm/dialog-confirm.component";
import { Id } from "../../models/id";
import { OrderStatus } from "../../dto/order-status";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public clothesList: ClothesModel[];
  private basketList: BasketModel[];

  constructor(
    private readonly basketRepository: BasketRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly currentUser: CurrentUser,
    private readonly orderRepository: OrderRepository,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    const currentUserId = this.currentUser.currentUserId;

    if (currentUserId) {
        this.basketList = await this.basketRepository.getByUserId(currentUserId);
        const clothesIds = this.getClothesIds();
        this.clothesList = await this.clothesRepository.getByIds(clothesIds);
    }
  }

  private getClothesIds() {
    return this.basketList.map(basket => basket.clothesId);
  }

  deleteFromBasket(clothesId: Id): void {
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите убрать одежду из корзины?" };
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe(async (isApply: boolean) => {
      if (isApply) {
        const index = this.basketList.findIndex(bask => bask.clothesId === clothesId);
        if (index != -1) {
          const isDeleted = await this.basketRepository.delete(this.basketList[index].basketId);

          if (!isDeleted) return;

          this.basketList.splice(index, 1);

          const clothesIndex = this.clothesList.findIndex(clothes => clothes.clothesId === clothesId);
          if (clothesIndex === -1) return;

          this.clothesList.splice(clothesIndex, 1);
        }
      }
    })
  }

  openOrderDialog(): void {
    const price = this.getSumPrice();
    const address = this.currentUser.currentUser?.address || "";

    const dialogRef = this.dialog.open(OrderDialogComponent,
      { data: {title: "Оформление заказа", order: { price, address }}, autoFocus: false });

    dialogRef.afterClosed().subscribe(async (order: Partial<IOrderDto>) => {
      if (!!order) {
        order.clothesIds = this.clothesList.map(clothes => clothes.clothesId);
        order.createdDate = new Date().toISOString();
        order.userId = this.currentUser.currentUserId;
        order.status = OrderStatus.InProcessing;
        await this.orderRepository.create(order);
        this.clothesList = [];
      }
    });
  }

  private getSumPrice(): number {
    let sumPrice = 0;

    for (const clothes of this.clothesList) {
      sumPrice += clothes.price
    }

    return sumPrice;
  }
}
