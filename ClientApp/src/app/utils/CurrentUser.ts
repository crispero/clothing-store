import { UserModel } from "../models/user.model";
import { Id } from "../models/id";

class CurrentUserClass {
  private _currentUser: UserModel | null;

  get currentUser(): UserModel | null {
    return this._currentUser;
  }

  get currentUserId(): Id | undefined {
    return this._currentUser?.id;
  }

  setCurrentUser(user: UserModel) {
    this._currentUser = user;
  }
}

export const CurrentUser = new CurrentUserClass();
