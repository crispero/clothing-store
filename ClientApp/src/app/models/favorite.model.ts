import { UserClothesModel } from "./user-clothes.model";
import { Exclude, Expose } from "class-transformer";
import { Id } from "./id";

@Exclude()
export class FavoriteModel extends UserClothesModel {
  private _favoriteId: Id;

  @Expose()
  get favoriteId(): Id {
    return this._favoriteId;
  }

  set favoriteId(value: Id) {
    this._favoriteId = value;
  }
}
