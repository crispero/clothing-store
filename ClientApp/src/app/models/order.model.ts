import { Id } from "./id";
import { Exclude, Expose } from "class-transformer";
import { OrderStatus } from "../dto/order-status";

@Exclude()
export class OrderModel {
  private _orderId: Id;
  private _userId: Id;
  private _price: number;
  private _deliveryAddress: string;
  private _createdDate: string;
  private _status: OrderStatus;
  private _clothesIds: Id[];

  @Expose()
  get orderId(): Id {
    return this._orderId;
  }

  set orderId(value: Id) {
    this._orderId = value;
  }

  @Expose()
  get userId(): Id {
    return this._userId;
  }

  set userId(value: Id) {
    this._userId = value;
  }

  @Expose()
  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  @Expose()
  get deliveryAddress(): string {
    return this._deliveryAddress;
  }

  set deliveryAddress(value: string) {
    this._deliveryAddress = value;
  }

  @Expose()
  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  @Expose()
  get status(): OrderStatus {
    return this._status;
  }

  set status(value: OrderStatus) {
    this._status = value;
  }

  @Expose()
  get clothesIds(): Id[] {
    return this._clothesIds;
  }

  set clothesIds(value: Id[]) {
    this._clothesIds = value;
  }
}
