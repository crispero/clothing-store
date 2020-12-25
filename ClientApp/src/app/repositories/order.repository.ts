import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { OrderModel } from "../models/order.model";
import { IOrderDto } from "../dto/order.dto";
import { OrderService } from "../services/order.service";
import { EntityMapper } from "../utils/entity-mapper";

@Injectable({
  providedIn: "root"
})
export class OrderRepository extends BaseRepository<OrderModel, IOrderDto, OrderService> {
  constructor(service: OrderService) {
    super(service);
  }

  toEntities(data: IOrderDto[]): OrderModel[] {
    return EntityMapper.toDomainEntities(OrderModel, data);
  }

  toEntity(data: IOrderDto): OrderModel {
    return EntityMapper.toDomainEntity(OrderModel, data);
  }
}
