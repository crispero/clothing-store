import { Id } from "../models/id";
import { OrderStatus } from "./order-status";

export interface IOrderDto {
  orderId: Id;
  userId: Id;
  price: number;
  deliveryAddress: string;
  createdDate: string;
  status: OrderStatus;
  clothesIds: Id[];
}
