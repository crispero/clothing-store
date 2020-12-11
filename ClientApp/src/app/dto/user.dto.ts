import { IWithId } from "../utils/IWithId";
import { Id } from "../models/id";
import { GenderType } from "../utils/GenderType";

export interface IUserDto extends IWithId {
  userTypeId: Id;
  login: string;
  name: string;
  surname: string;
  address: string;
  pictureUrl: string;
  genderType: GenderType;
}
