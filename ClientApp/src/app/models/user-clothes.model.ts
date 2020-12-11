﻿import { Id } from "./id";
import { Exclude, Expose } from "class-transformer";
import { EntityModel } from "./entity.model";

@Exclude()
export class UserClothesModel extends EntityModel {
  private _userId: Id;
  private _clothesId: Id;

  @Expose()
  get userId(): Id {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  @Expose()
  get clothesId(): Id {
    return this._clothesId;
  }

  set clothesId(value: Id) {
    this._clothesId = value;
  }
}
