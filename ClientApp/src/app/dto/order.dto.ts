import { Id } from "../models/id";
import { OrderStatus } from "../models/order-status";

export interface IOrderDto {
  orderId: Id;
  userId: Id;
  price: number;
  deliveryAddress: string;
  createdDate: number;
  status: OrderStatus;
}
