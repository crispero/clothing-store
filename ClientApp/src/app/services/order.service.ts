import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { IOrderDto } from "../dto/order.dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<IOrderDto> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Order);
  }
}
