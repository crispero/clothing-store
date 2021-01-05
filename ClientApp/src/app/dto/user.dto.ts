import { Id } from "../models/id";
import { GenderType } from "./gender-type";

export interface IUserDto {
  userId: Id;
  userTypeId: Id;
  login: string;
  name: string;
  surname: string;
  address: string;
  pictureUrl: string;
  genderType: GenderType;
}

