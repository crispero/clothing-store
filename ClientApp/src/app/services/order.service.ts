import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Inject, Injectable } from "@angular/core";
import { IOrderDto } from "../dto/order.dto";
import { SERVICE_URL } from "../app-injection-tokens";
import { Id } from "../models/id";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<IOrderDto> {
  constructor(
    protected http: HttpClient,
    @Inject(SERVICE_URL) readonly serviceUrl: string,
  ) {
    super(http, serviceUrl, ApiResourceName.Order);
  }

  getByUserId(userId: Id): Promise<IOrderDto[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<IOrderDto[]>(url).toPromise();
  }
}
