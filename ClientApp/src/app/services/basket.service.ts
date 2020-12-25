import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Inject, Injectable } from "@angular/core";
import { IBasketDto } from "../dto/basket.dto";
import { SERVICE_URL } from "../app-injection-tokens";
import { Id } from "../models/id";

@Injectable({
  providedIn: 'root'
})
export class BasketService extends BaseService<IBasketDto> {
  constructor(
    protected http: HttpClient,
    @Inject(SERVICE_URL) readonly serviceUrl: string,
  ) {
    super(http, serviceUrl, ApiResourceName.Basket);
  }

  async getByUserId(userId: Id): Promise<IBasketDto[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<IBasketDto[]>(url).toPromise();
  }
}
