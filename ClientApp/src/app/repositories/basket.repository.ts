import { BaseRepository } from "./base.repository";
import { EntityMapper } from "../utils/EntityMapper";
import { Injectable } from "@angular/core";
import { BasketModel } from "../models/basket.model";
import { IBasketDto } from "../dto/basket.dto";
import { BasketService } from "../services/basket.service";

@Injectable({
  providedIn: "root"
})
export class BasketRepository extends BaseRepository<BasketModel, IBasketDto, BasketService> {
  constructor(service: BasketService) {
    super(service);
  }

  toEntities(data: IBasketDto[]): BasketModel[] {
    return EntityMapper.toDomainEntities(BasketModel, data);
  }

  toEntity(data: IBasketDto): BasketModel {
    return EntityMapper.toDomainEntity(BasketModel, data);
  }
}
