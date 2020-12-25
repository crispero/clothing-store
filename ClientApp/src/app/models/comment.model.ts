import { UserClothesModel } from "./user-clothes.model";
import { Exclude, Expose } from "class-transformer";
import { Id } from "./id";

@Exclude()
export class CommentModel extends UserClothesModel {
  private _commentId: Id;
  private _text: string;
  private _createdDate: number;

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
  get createdDate(): number {
    return this._createdDate;
  }

  set createDate(value: number) {
    this._createdDate = value;
  }
}
