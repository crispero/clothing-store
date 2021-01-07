import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AttachmentModel {
  private _path: string;

  @Expose()
  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }
}
