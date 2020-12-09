import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { BrandModel } from "../models/brand.model";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService<BrandModel> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Brand);
  }
}
