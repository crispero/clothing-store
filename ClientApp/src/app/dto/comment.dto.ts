import { IWithId } from "../utils/IWithId";
import { IUserClothesDto } from "./user-clothes.dto";

export interface ICommentDto extends IWithId, IUserClothesDto {
  text: string;
  createdDate: number;
}
