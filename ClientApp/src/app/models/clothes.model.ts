import { EntityModel } from "./entity.model";
import { GenderType } from "../utils/GenderType";

export interface ClothesModel extends EntityModel {
  name: string;
  price: number;
  pictureUrl: string;
  description: string;
  color: string;
  gender: GenderType;
}
