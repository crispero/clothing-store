import { Component, OnInit } from '@angular/core';
import { OrderModel } from "../../../models/order.model";
import { OrderRepository } from "../../../repositories/order.repository";
import { Id } from "../../../models/id";
import { ClothesModel } from "../../../models/clothes.model";
import { ClothesRepository } from "../../../repositories/clothes.repository";
import { IOrderDto } from "../../../dto/order.dto";

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent implements OnInit {
  public orders: OrderModel[] = [];
  public ordersMap = new Map<Id, ClothesModel[]>();

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clothesRepository: ClothesRepository,
  ) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.orderRepository.getAll();

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

  async changeOrderStatus(orderDto: Partial<IOrderDto>): Promise<void> {
    const orderId = orderDto.orderId!;
    const updatedOrder = await this.orderRepository.update(orderId, orderDto);

    const index = this.orders.findIndex(order => order.orderId === orderId);

    if (index !== -1) {
      this.orders.splice(index, 1, updatedOrder);
    }
  }

}
