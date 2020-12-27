import { UserClothesModel } from "./user-clothes.model";
import { Exclude, Expose } from "class-transformer";
import { Id } from "./id";

@Exclude()
export class CommentModel extends UserClothesModel {
  private _commentId: Id;
  private _text: string;
  private _createdDate: string;

  @Expose()
  get commentId(): Id {
    return this._commentId;
  }

  set commentId(value: Id) {
    this._commentId = value;
  }

  @Expose()
  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  @Expose()
  get createdDate(): string {
    return this._createdDate;
  }

  set createDate(value: string) {
    this._createdDate = value;
  }
}
