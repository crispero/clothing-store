import { GenderType } from "./GenderType";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApplicationUtils {
  private _currentGenderType: GenderType = GenderType.Woman;

  get currentGenderType(): GenderType {
    return this._currentGenderType;
  }

  setCurrentGenderType(value: GenderType) {
    this._currentGenderType = value;
  }
}
