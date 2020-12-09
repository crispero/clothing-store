import { EntityModel } from "./entity.model";
import { UserClothesModel } from "./user-clothes.model";

export interface FavoriteModel extends UserClothesModel, EntityModel {}
