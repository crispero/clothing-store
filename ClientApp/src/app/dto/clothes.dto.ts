import { GenderType } from "./gender-type";
import { Id } from "../models/id";

export interface IClothesDto {
  clothesId: Id;
  name: string;
  price: number;
  pictureUrl: string;
  description: string;
  color: string;
  genderType: GenderType;
  brandId: Id;
}
