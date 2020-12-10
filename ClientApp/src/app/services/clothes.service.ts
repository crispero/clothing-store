import { BaseService } from "./base.service";
import { ClothesModel } from "../models/clothes.model";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { IClothesDto } from "../dto/clothes.dto";

@Injectable({
  providedIn: 'root'
})
export class ClothesService extends BaseService<IClothesDto> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Clothes);
  }
}
