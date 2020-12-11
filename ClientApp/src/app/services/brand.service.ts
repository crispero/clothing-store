import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { IBrandDto } from "../dto/brand.dto";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService<IBrandDto> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Brand);
  }
}
