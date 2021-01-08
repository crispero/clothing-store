import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApplicationUtils {
  private readonly _loginMinLength: number = 4;
  private readonly _passwordPattern: string = "";
  private readonly _loginErrorText: string = "Логин должен состоять минимум из 4 символов";
  private readonly _passwordErrorText: string = "Пароль должен состоять минимум из 6 символов";

  get loginMinLength(): number {
    return this._loginMinLength;
  }

  get passwordPattern(): string {
    return this._passwordPattern;
  }

  get loginErrorText(): string {
    return this._loginErrorText;
  }

  get passwordErrorText(): string {
    return this._passwordErrorText;
  }
}
