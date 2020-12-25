import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppRoutesService } from "../routes/app-routes.service";
import { AuthUtils } from "../utils/auth.utils";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authUtils: AuthUtils,
    private appRoutesService: AppRoutesService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authUtils.isAuthenticated()) return true;

    this.appRoutesService.goToLoginPage();
    return false;
  }
}
