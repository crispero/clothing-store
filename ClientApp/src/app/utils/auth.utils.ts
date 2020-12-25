import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ILoginDto } from "../dto/login.dto";
import { IRegisterDto } from "../dto/register.dto";
import { BehaviorSubject, Observable } from "rxjs";
import { IAuthDto } from "../dto/auth.dto";
import { AppRoutesService } from "../routes/app-routes.service";
import { UserRepository } from "../repositories/user.repository";
import { LocalStorageUtils } from "./local-storage.utils";
import { CurrentUser } from "./current-user";

@Injectable({
  providedIn: "root"
})
export class AuthUtils {
  private authorizedSubject$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly authService: AuthService,
    private readonly localStorageUtils: LocalStorageUtils,
    private readonly appRoutesService: AppRoutesService,
    private readonly userRepository: UserRepository,
    private readonly currentUser: CurrentUser,
  ) {
  }

  getAuthorized(): Observable<boolean> {
    return this.authorizedSubject$.asObservable();
  }

  async login(loginDto: ILoginDto): Promise<void> {
    const authDto = await this.authService.loginUser(loginDto);
    this.setAuthData(authDto);
  }

  async register(registerDto: IRegisterDto): Promise<void> {
    const authDto = await this.authService.registerUser(registerDto);
    this.setAuthData(authDto);
  }

  logout() {
    this.localStorageUtils.removeUserId();
    this.localStorageUtils.removeAccessToken();
    this.setAuthorized(false);
    this.appRoutesService.goToLoginPage();
  }

  private async setAuthData(authDto: IAuthDto) {
    this.localStorageUtils.setAuthData(authDto);
    this.setAuthorized(true);
    const user = await this.userRepository.getById(authDto.userId);
    this.currentUser.setCurrentUser(user);
    this.appRoutesService.goToClothesPage();
  }

  private setAuthorized(value: boolean): void {
    this.authorizedSubject$.next(value);
  }
}
