import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { IFavoriteDto } from "../dto/favorite.dto";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends BaseService<IFavoriteDto> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Favorite);
  }
}
