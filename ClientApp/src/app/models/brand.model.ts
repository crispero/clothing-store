import { EntityModel } from "./entity.model";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class BrandModel extends EntityModel {
  private _name: string;
  private _description: string;
  private _logoUrl: string;

  @Expose()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @Expose()
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  @Expose()
  get logoUrl(): string {
    return this._logoUrl;
  }

  set logoUrl(value: string) {
    this._logoUrl = value;
  }
}
