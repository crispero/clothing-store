import { EntityModel } from "./entity.model";

export class ClothesModel extends EntityModel {
  private _name: string;

  constructor(name: string) {
    super();
    this._name = name;
  }
}
