import { Id } from "./id";
import { Exclude, Expose } from "class-transformer";
import { GenderType } from "../dto/gender-type";

@Exclude()
export class UserModel {
  private _userId: Id;
  private _userTypeId: Id;
  private _name: string;
  private _surname: string;
  private _login: string;
  private _address: string;
  private _pictureUrl: string;
  private _genderType: GenderType;

  @Expose()
  get userId(): Id {
    return this._userId;
  }

  set userId(value: Id) {
    this._userId = value;
  }

  @Expose()
  get userTypeId(): Id {
    return this._userTypeId;
  }

  set userTypeId(value: Id) {
    this._userTypeId = value;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @Expose()
  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  @Expose()
  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  @Expose()
  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  @Expose()
  get pictureUrl(): string {
    return this._pictureUrl;
  }

  set pictureUrl(value: string) {
    this._pictureUrl = value;
  }

  @Expose()
  get genderType(): GenderType {
    return this._genderType;
  }

  set genderType(genderType: GenderType) {
    this._genderType = genderType;
  }
}
