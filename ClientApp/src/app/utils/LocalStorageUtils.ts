import { LocalStorageKeys } from "./LocalStorageKeys";
import { Id } from "../models/id";
import { IAuthDto } from "../dto/auth.dto";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageUtils {
  getUserId(): string | null {
    return localStorage.getItem(LocalStorageKeys.UserId);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.Token);
  }

  setAuthData(authDto: IAuthDto): void {
    this.setUserId(authDto.userId);
    this.setAccessToken(authDto.token);
  }

  setUserId(userId: Id): void {
    localStorage.setItem(LocalStorageKeys.UserId, userId);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(LocalStorageKeys.Token, token);
  }

  removeUserId(): void {
    localStorage.removeItem(LocalStorageKeys.UserId);
  }

  removeAccessToken(): void {
    localStorage.removeItem(LocalStorageKeys.Token);
  }
}
