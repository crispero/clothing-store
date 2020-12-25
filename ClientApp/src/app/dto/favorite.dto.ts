import { IUserClothesDto } from "./user-clothes.dto";
import { Id } from "../models/id";

export interface IFavoriteDto extends IUserClothesDto {
  favoriteId: Id;
}
