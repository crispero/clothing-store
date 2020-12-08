import { BaseService } from "./base.service";
import { ClothesModel } from "../models/clothes.model";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";

export class ClothesService extends BaseService<ClothesModel> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Clothes);
  }
}
