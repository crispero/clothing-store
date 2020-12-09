import { EntityModel } from "./entity.model";
import { UserClothesModel } from "./user-clothes.model";

export interface CommentModel extends UserClothesModel, EntityModel {
  text: string;
  createdDate: number;
}
