import { Id } from "../models/id";

export interface IAuthDto {
  userId: Id;
  token: string;
}
