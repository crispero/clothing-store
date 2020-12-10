import { EntityModel } from "./entity.model";
import { GenderType } from "../utils/GenderType";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ClothesModel extends EntityModel {
  private _name: string;
  private _price: number;
  private _pictureUrl: string;
  private _description: string;
  private _color: string;
  private _genderType: GenderType;

  @Expose()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @Expose()
  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  @Expose()
  get pictureUrl(): string {
    return this._pictureUrl;
  }

  set pictureUrl(value: string) {
    this._pictureUrl = value;
  }

  @Expose()
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  @Expose()
  get genderType(): GenderType {
    return this._genderType;
  }

  set genderType(genderType: GenderType) {
    this._genderType = genderType;
  }

  @Expose()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }
}
