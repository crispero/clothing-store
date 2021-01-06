import { UserClothesModel } from "./user-clothes.model";
import { Exclude, Expose } from "class-transformer";
import { Id } from "./id";

@Exclude()
export class BasketModel extends UserClothesModel {
  private _basketId: Id;

  @Expose()
  get basketId(): Id {
    return this._basketId;
  }

  set basketId(value: Id) {
    this._basketId = value;
  }
}
