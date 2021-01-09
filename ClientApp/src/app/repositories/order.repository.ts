import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { OrderModel } from "../models/order.model";
import { IOrderDto } from "../dto/order.dto";
import { OrderService } from "../services/order.service";
import { EntityMapper } from "../utils/entity-mapper";
import { Id } from "../models/id";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class OrderRepository extends BaseRepository<OrderModel, IOrderDto, OrderService> {
  constructor(service: OrderService, snackBar: MatSnackBar) {
    super(service, snackBar);
  }

  async getByUserId(userId: Id): Promise<OrderModel[]> {
    const orders = await this.service.getByUserId(userId);
    return this.toEntities(orders);
  }

  toEntities(data: IOrderDto[]): OrderModel[] {
    return EntityMapper.toDomainEntities(OrderModel, data);
  }

  toEntity(data: IOrderDto): OrderModel {
    return EntityMapper.toDomainEntity(OrderModel, data);
  }
}
