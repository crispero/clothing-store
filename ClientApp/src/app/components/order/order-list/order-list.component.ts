import { Component, OnInit } from '@angular/core';
import { OrderModel } from "../../../models/order.model";
import { OrderRepository } from "../../../repositories/order.repository";
import { CurrentUser } from "../../../utils/current-user";
import { Id } from "../../../models/id";
import { ClothesModel } from "../../../models/clothes.model";
import { ClothesRepository } from "../../../repositories/clothes.repository";
import { IOrderDto } from "../../../dto/order.dto";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  public orders: OrderModel[];
  public ordersMap = new Map<Id, ClothesModel[]>();

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clothesRepository: ClothesRepository,
    private readonly currentUser: CurrentUser,
  ) { }

  async ngOnInit(): Promise<void> {
    const userId = this.currentUser.currentUserId;

    this.orders = await this.orderRepository.getByUserId(userId);

    for (const order of this.orders) {
        const clothesIds = order.clothesIds;

        const clothes = await this.clothesRepository.getByIds(clothesIds);

        this.ordersMap.set(order.orderId, clothes);
    }
  }

  async deleteOrder(id: Id): Promise<void> {
    const isDeleted = await this.orderRepository.delete(id);

    if (!isDeleted) return;

    const index = this.orders.findIndex(order => order.orderId === id);

    if (index !== -1) {
      this.orders.splice(index, 1);
    }
  }
}
