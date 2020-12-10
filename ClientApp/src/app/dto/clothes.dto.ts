import { IWithId } from "../models/IWithId";
import { GenderType } from "../utils/GenderType";

export interface IClothesDto extends IWithId {
  name: string;
  price: number;
  pictureUrl: string;
  description: string;
  color: string;
  genderType: GenderType;
}
