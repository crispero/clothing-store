import { BaseRepository } from "./base.repository";
import { ClothesModel } from "../models/clothes.model";
import { IClothesDto } from "../dto/clothes.dto";
import { ClothesService } from "../services/clothes.service";
import { Injectable } from "@angular/core";
import { EntityMapper } from "../utils/entity-mapper";
import { IClothesFilterParams } from "../dto/clothes-filter-params";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class ClothesRepository extends BaseRepository<ClothesModel, IClothesDto, ClothesService> {
  constructor(service: ClothesService, snackBar: MatSnackBar) {
    super(service, snackBar);
  }

  async getClothesWithParams(params?: Partial<IClothesFilterParams>): Promise<ClothesModel[]> {
    const clothesDtos = await this.service.getClothesWithParams({ ...params, isOrdered: false });
    return this.toEntities(clothesDtos);
  }

  toEntities(data: IClothesDto[]): ClothesModel[] {
    return EntityMapper.toDomainEntities(ClothesModel, data);
  }

  toEntity(data: IClothesDto): ClothesModel {
    return EntityMapper.toDomainEntity(ClothesModel, data);
  }
}
