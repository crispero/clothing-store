import { IWithId } from "../utils/IWithId";
import { IUserClothesDto } from "./user-clothes.dto";

export interface IBasketDto extends IWithId, IUserClothesDto {}
