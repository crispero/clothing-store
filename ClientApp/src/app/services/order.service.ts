import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { OrderModel } from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderModel> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Order);
  }
}
