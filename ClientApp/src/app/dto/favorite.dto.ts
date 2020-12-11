import { IWithId } from "../utils/IWithId";
import { IUserClothesDto } from "./user-clothes.dto";

export interface IFavoriteDto extends IWithId, IUserClothesDto {}
