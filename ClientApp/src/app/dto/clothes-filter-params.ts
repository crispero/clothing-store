import { GenderType } from "./gender-type";
import { ClothesSize } from "./clothes-size";

export interface IClothesFilterParams {
  name: string;
  genderType: GenderType;
  size: ClothesSize,
  isOrdered: boolean;
}
