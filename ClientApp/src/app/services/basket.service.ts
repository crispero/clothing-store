import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { BasketModel } from "../models/basket.model";

@Injectable({
  providedIn: 'root'
})
export class BasketService extends BaseService<BasketModel> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Basket);
  }
}
