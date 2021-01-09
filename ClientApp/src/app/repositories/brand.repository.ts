import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { BrandModel } from "../models/brand.model";
import { IBrandDto } from "../dto/brand.dto";
import { BrandService } from "../services/brand.service";
import { EntityMapper } from "../utils/entity-mapper";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class BrandRepository extends BaseRepository<BrandModel, IBrandDto, BrandService> {
  constructor(service: BrandService, snackBar: MatSnackBar) {
    super(service, snackBar);
  }

  toEntities(data: IBrandDto[]): BrandModel[] {
    return EntityMapper.toDomainEntities(BrandModel, data);
  }

  toEntity(data: IBrandDto): BrandModel {
    return EntityMapper.toDomainEntity(BrandModel, data);
  }
}
