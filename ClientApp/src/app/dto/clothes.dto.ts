import { GenderType } from "./gender-type";
import { Id } from "../models/id";
import { ClothesSize } from "./clothes-size";

export interface IClothesDto {
  clothesId: Id;
  name: string;
  price: number;
  pictureUrl: string;
  description: string;
  color: string;
  genderType: GenderType;
  size: ClothesSize;
  brandId: Id;
  isOrdered: boolean;
}
