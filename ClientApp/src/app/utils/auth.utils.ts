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
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private jwtHelperService: JwtHelperService,
    private snackBar: MatSnackBar,
  ) {
    if (this.isAuthenticated()) {
      this.setAuthorized(true);
    }
  }

  getAuthorized(): Observable<boolean> {
    return this.authorizedSubject$.asObservable();
  }

  isAuthenticated(): boolean {
    const accessToken = this.localStorageUtils.getAccessToken();
    if (!accessToken) return false;
    return !this.jwtHelperService.isTokenExpired(accessToken);
  }

  async login(loginDto: ILoginDto): Promise<void> {
    try {
      const authDto = await this.authService.loginUser(loginDto);
      this.setAuthData(authDto);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
    }
  }

  async register(registerDto: IRegisterDto): Promise<void> {
    try {
      const authDto = await this.authService.registerUser(registerDto);
      this.setAuthData(authDto);
    } catch (e) {
      this.openSnackBar(e?.error?.message);
    }
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

  protected openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 5000,
    });
  }
}
