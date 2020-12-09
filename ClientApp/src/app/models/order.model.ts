import { EntityModel } from "./entity.model";
import { Id } from "./id";
import { OrderStatus } from "./order-status";

export interface OrderModel extends EntityModel {
  userId: Id;
  price: number;
  deliveryAddress: string;
  createdDate: number;
  status: OrderStatus;
}
