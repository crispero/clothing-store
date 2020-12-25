import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { BrandModel } from "../models/brand.model";
import { IBrandDto } from "../dto/brand.dto";
import { BrandService } from "../services/brand.service";
import { EntityMapper } from "../utils/entity-mapper";

@Injectable({
  providedIn: "root"
})
export class BrandRepository extends BaseRepository<BrandModel, IBrandDto, BrandService> {
  constructor(service: BrandService) {
    super(service);
  }

  toEntities(data: IBrandDto[]): BrandModel[] {
    return EntityMapper.toDomainEntities(BrandModel, data);
  }

  toEntity(data: IBrandDto): BrandModel {
    return EntityMapper.toDomainEntity(BrandModel, data);
  }
}
