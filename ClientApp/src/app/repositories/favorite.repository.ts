import { BaseRepository } from "./base.repository";
import { EntityMapper } from "../utils/EntityMapper";
import { Injectable } from "@angular/core";
import { FavoriteModel } from "../models/favorite.model";
import { IFavoriteDto } from "../dto/favorite.dto";
import { FavoriteService } from "../services/favorite.service";

@Injectable({
  providedIn: "root"
})
export class FavoriteRepository extends BaseRepository<FavoriteModel, IFavoriteDto, FavoriteService> {
  constructor(service: FavoriteService) {
    super(service);
  }

  toEntities(data: IFavoriteDto[]): FavoriteModel[] {
    return EntityMapper.toDomainEntities(FavoriteModel, data);
  }

  toEntity(data: IFavoriteDto): FavoriteModel {
    return EntityMapper.toDomainEntity(FavoriteModel, data);
  }
}
