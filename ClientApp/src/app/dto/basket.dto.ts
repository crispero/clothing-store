import { IUserClothesDto } from "./user-clothes.dto";
import { Id } from "../models/id";

export interface IBasketDto extends IUserClothesDto {
  basketId: Id;
}
