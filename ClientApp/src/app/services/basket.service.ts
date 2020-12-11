import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { IBasketDto } from "../dto/basket.dto";

@Injectable({
  providedIn: 'root'
})
export class BasketService extends BaseService<IBasketDto> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Basket);
  }
}
