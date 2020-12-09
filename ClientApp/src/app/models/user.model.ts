import { EntityModel } from "./entity.model";
import { Id } from "./id";
import { GenderType } from "../utils/GenderType";

export interface UserModel extends EntityModel {
  userTypeId: Id;
  name: string;
  surname: string;
  login: string;
  password: string;
  address: string;
  pictureUrl: string;
  gender: GenderType;
}
