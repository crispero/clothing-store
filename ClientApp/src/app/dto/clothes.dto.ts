import { GenderType } from "../utils/GenderType";
import { IWithId } from "../utils/IWithId";

export interface IClothesDto extends IWithId {
  name: string;
  price: number;
  pictureUrl: string;
  description: string;
  color: string;
  genderType: GenderType;
}
