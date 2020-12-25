import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GenderType } from "../dto/gender-type";

@Injectable({
  providedIn: "root"
})
export class ApplicationUtils {
  private _currentGenderType = new BehaviorSubject<GenderType>(GenderType.Woman);

  get currentGenderType(): Observable<GenderType> {
    return this._currentGenderType.asObservable();
  }

  setCurrentGenderType(value: GenderType) {
    this._currentGenderType.next(value);
  }
}
