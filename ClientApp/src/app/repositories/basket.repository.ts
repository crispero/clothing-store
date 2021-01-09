import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { BasketModel } from "../models/basket.model";
import { IBasketDto } from "../dto/basket.dto";
import { BasketService } from "../services/basket.service";
import { EntityMapper } from "../utils/entity-mapper";
import { Id } from "../models/id";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class BasketRepository extends BaseRepository<BasketModel, IBasketDto, BasketService> {
  constructor(service: BasketService,  snackBar: MatSnackBar) {
    super(service, snackBar);
  }

  async getByUserId(userId: Id): Promise<BasketModel[]> {
    const baskets = await this.service.getByUserId(userId);
    return this.toEntities(baskets);
  }

  toEntities(data: IBasketDto[]): BasketModel[] {
    return EntityMapper.toDomainEntities(BasketModel, data);
  }

  toEntity(data: IBasketDto): BasketModel {
    return EntityMapper.toDomainEntity(BasketModel, data);
  }
}
