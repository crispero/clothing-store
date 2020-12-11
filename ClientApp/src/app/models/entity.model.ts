import { Id } from "./id";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class EntityModel {
  private _id: Id;

  @Expose()
  get id(): Id {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
