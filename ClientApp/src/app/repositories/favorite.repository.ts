import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { FavoriteModel } from "../models/favorite.model";
import { IFavoriteDto } from "../dto/favorite.dto";
import { FavoriteService } from "../services/favorite.service";
import { Id } from "../models/id";
import { EntityMapper } from "../utils/entity-mapper";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class FavoriteRepository extends BaseRepository<FavoriteModel, IFavoriteDto, FavoriteService> {
  constructor(service: FavoriteService, snackBar: MatSnackBar) {
    super(service, snackBar);
  }

  async getByUserId(userId: Id): Promise<FavoriteModel[]> {
    const favorites = await this.service.getByUserId(userId);
    return this.toEntities(favorites);
  }

  toEntities(data: IFavoriteDto[]): FavoriteModel[] {
    return EntityMapper.toDomainEntities(FavoriteModel, data);
  }

  toEntity(data: IFavoriteDto): FavoriteModel {
    return EntityMapper.toDomainEntity(FavoriteModel, data);
  }
}
