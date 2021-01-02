import { Component, OnInit } from '@angular/core';
import { AppRoutesService } from "../../routes/app-routes.service";
import { Observable } from "rxjs";
import { AuthUtils } from "../../utils/auth.utils";
import { CurrentUser } from "../../utils/current-user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public authorized$: Observable<boolean>;
  public isAdmin: boolean;

  constructor(
    private readonly appRoutesService: AppRoutesService,
    private readonly authUtils: AuthUtils,
    private readonly currentUser: CurrentUser
  ) {
    this.authorized$ = authUtils.getAuthorized();
  }

  ngOnInit(): void {
    this.isAdmin = this.currentUser.isAdmin();
  }

  onClickHome(): void {
    this.appRoutesService.goToClothesPage();
  }

  onClickUserProfile(): void {
    this.appRoutesService.goToUserProfilePage();
  }

  onClickFavorite(): void {
    this.appRoutesService.goToFavoritePage();
  }

  onClickBasket(): void {
    this.appRoutesService.goToBasketPage();
  }

  onClickOrder(): void {
    this.appRoutesService.goToOrderPage();
  }

  onClickBrand(): void {
    this.appRoutesService.goToBrandPage();
  }

  onClickLogout(): void {
    this.authUtils.logout();
  }
}
