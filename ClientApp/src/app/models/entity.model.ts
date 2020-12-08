import { IWithId } from "./IWithId";
import { Id } from "./id";

export class EntityModel implements IWithId {
  private _id!: Id;

  get id(): Id {
    return this._id;
  }

  set id(value: Id) {
    this._id = value;
  }
}
