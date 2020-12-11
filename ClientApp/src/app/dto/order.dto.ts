import { IWithId } from "../utils/IWithId";
import { Id } from "../models/id";
import { OrderStatus } from "../models/order-status";

export interface IOrderDto extends IWithId {
  userId: Id;
  price: number;
  deliveryAddress: string;
  createdDate: number;
  status: OrderStatus;
}
