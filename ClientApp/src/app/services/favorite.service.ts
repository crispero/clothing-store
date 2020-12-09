import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { FavoriteModel } from "../models/favorite.model";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends BaseService<FavoriteModel> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Favorite);
  }
}
