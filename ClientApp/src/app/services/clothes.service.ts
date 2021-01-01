import { BaseService } from "./base.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Inject, Injectable } from "@angular/core";
import { IClothesDto } from "../dto/clothes.dto";
import { SERVICE_URL } from "../app-injection-tokens";
import { IClothesFilterParams } from "../dto/clothes-filter-params";

@Injectable({
  providedIn: 'root'
})
export class ClothesService extends BaseService<IClothesDto> {
  constructor(
    protected http: HttpClient,
    @Inject(SERVICE_URL) readonly serviceUrl: string,
  ) {
    super(http, serviceUrl, ApiResourceName.Clothes);
  }

  async getClothesWithParams(params?: Partial<IClothesFilterParams>): Promise<IClothesDto[]> {
    const url = `${this.apiUrl}/params`;
    return this.http.post<IClothesDto[]>(url, params).toPromise();
  }
}
