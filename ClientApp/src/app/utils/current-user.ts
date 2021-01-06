import { UserModel } from "../models/user.model";
import { Id } from "../models/id";
import { Injectable } from "@angular/core";
import { LocalStorageUtils } from "./local-storage.utils";
import { UserType } from "../dto/user-type";
import { UserRepository } from "../repositories/user.repository";

@Injectable({
  providedIn: "root"
})
export class CurrentUser {
  constructor(
    private readonly localStorageUtils: LocalStorageUtils,
    private readonly userRepository: UserRepository,
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

  async isAdmin(): Promise<boolean> {
    if (this._currentUser) {
      return this._currentUser?.userTypeId === UserType.Admin;
    }

    const user = await this.userRepository.getById(this.currentUserId);
    return user.userTypeId === UserType.Admin;
  }
}
