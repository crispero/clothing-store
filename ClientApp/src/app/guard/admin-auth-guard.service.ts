import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppRoutesService } from "../routes/app-routes.service";
import { AuthUtils } from "../utils/auth.utils";
import { CurrentUser } from "../utils/current-user";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authUtils: AuthUtils,
    private currentUser: CurrentUser,
    private appRoutesService: AppRoutesService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.currentUser.isAdmin()) {
        return true;
      }

      this.appRoutesService.goToLoginPage();
      return false;
  }
}
