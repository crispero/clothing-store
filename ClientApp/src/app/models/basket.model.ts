import { UserClothesModel } from "./user-clothes.model";
import { Exclude } from "class-transformer";

@Exclude()
export class BasketModel extends UserClothesModel {}
