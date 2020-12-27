import { IUserClothesDto } from "./user-clothes.dto";
import { Id } from "../models/id";

export interface ICommentDto extends IUserClothesDto {
  commentId: Id;
  text: string;
  createdDate: string;
}
