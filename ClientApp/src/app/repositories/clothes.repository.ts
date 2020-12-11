import { BaseRepository } from "./base.repository";
import { ClothesModel } from "../models/clothes.model";
import { EntityMapper } from "../utils/EntityMapper";
import { IClothesDto } from "../dto/clothes.dto";
import { ClothesService } from "../services/clothes.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ClothesRepository extends BaseRepository<ClothesModel, IClothesDto, ClothesService> {
  constructor(service: ClothesService) {
    super(service);
  }

  toEntities(data: IClothesDto[]): ClothesModel[] {
    return EntityMapper.toDomainEntities(ClothesModel, data);
  }

  toEntity(data: IClothesDto): ClothesModel {
    return EntityMapper.toDomainEntity(ClothesModel, data);
  }
}
