import { UserModel } from "../models/user.model";
import { Id } from "../models/id";
import { Injectable } from "@angular/core";
import { LocalStorageUtils } from "./local-storage.utils";
import { UserType } from "./user-type.utils";

@Injectable({
  providedIn: "root"
})
export class CurrentUser {
  constructor(
    private readonly localStorageUtils: LocalStorageUtils,
  ) {
  }

  private _currentUser: UserModel | null;

  get currentUser(): UserModel | null {
    return this._currentUser;
  }

  get currentUserId(): Id {
    return this._currentUser?.userId || this.localStorageUtils.getUserId() || "";
  }

  setCurrentUser(user: UserModel): void {
    this._currentUser = user;
  }

  isAdmin(): boolean {
    return this._currentUser?.userTypeId === UserType.Admin.toString();
  }
}
