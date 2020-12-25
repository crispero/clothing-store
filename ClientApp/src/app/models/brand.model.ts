import { Exclude, Expose } from "class-transformer";
import { Id } from "./id";

@Exclude()
export class BrandModel {
  private _brandId: Id;
  private _name: string;
  private _description: string;
  private _logoUrl: string;

  @Expose()
  get brandId(): Id {
    return this._brandId;
  }

  set brandId(value: Id) {
    this._brandId = value;
  }

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
