import { UserClothesModel } from "./user-clothes.model";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CommentModel extends UserClothesModel {
  private _text: string;
  private _createdDate: number;

  @Expose()
  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  @Expose()
  get createdDate(): number {
    return this._createdDate;
  }

  set createDate(value: number) {
    this._createdDate = value;
  }
}
