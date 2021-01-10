import { UserModel } from "../models/user.model";
import { Id } from "../models/id";
import { Injectable } from "@angular/core";
import { LocalStorageUtils } from "./local-storage.utils";
import { UserType } from "../dto/user-type";
import { UserRepository } from "../repositories/user.repository";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class CurrentUser {
  constructor(
    private readonly localStorageUtils: LocalStorageUtils,
    private readonly userRepository: UserRepository,
    private jwtHelperService: JwtHelperService,
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
    if (this._currentUser) {
      return this._currentUser?.userTypeId === UserType.Admin;
    }

    return this.getUserType() === "admin";
  }

  getUserType(): string {
    const accessToken = this.localStorageUtils.getAccessToken();

    if (!accessToken) return "";

    return this.jwtHelperService.decodeToken(accessToken)?.role || "";
  }
}
