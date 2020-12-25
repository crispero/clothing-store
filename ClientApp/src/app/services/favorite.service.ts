import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Inject, Injectable } from "@angular/core";
import { IFavoriteDto } from "../dto/favorite.dto";
import { SERVICE_URL } from "../app-injection-tokens";
import { Id } from "../models/id";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends BaseService<IFavoriteDto> {
  constructor(
    protected http: HttpClient,
    @Inject(SERVICE_URL) readonly serviceUrl: string,
  ) {
    super(http, serviceUrl, ApiResourceName.Favorite);
  }

  getByUserId(userId: Id): Promise<IFavoriteDto[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<IFavoriteDto[]>(url).toPromise();
  }
}
