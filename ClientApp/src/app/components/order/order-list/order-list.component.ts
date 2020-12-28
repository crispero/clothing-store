import { Component, OnInit } from '@angular/core';
import { OrderModel } from "../../../models/order.model";
import { OrderRepository } from "../../../repositories/order.repository";
import { CurrentUser } from "../../../utils/current-user";
import { ClothesDialogComponent } from "../../clothes/clothes-dialog/clothes-dialog.component";
import { IClothesDto } from "../../../dto/clothes.dto";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  public orders: OrderModel[];

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly currentUser: CurrentUser,
  ) { }

  async ngOnInit(): Promise<void> {
    const userId = this.currentUser.currentUserId;

    this.orders = await this.orderRepository.getByUserId(userId);
  }
}
