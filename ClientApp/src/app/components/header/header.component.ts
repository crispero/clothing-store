import { Component, OnInit } from '@angular/core';
import { AppRoutesService } from "../../routes/app-routes.service";
import { Observable } from "rxjs";
import { GenderType } from "../../dto/gender-type";
import { ApplicationUtils } from "../../utils/application.utils";
import { AuthUtils } from "../../utils/auth.utils";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public authorized$: Observable<boolean>;
  public currentGenderType: Observable<GenderType>;
  public isCurrentWomanType: boolean = true;

  constructor(
    private readonly appRoutesService: AppRoutesService,
    private readonly applicationUtils: ApplicationUtils,
    private readonly authUtils: AuthUtils,
  ) {
    this.authorized$ = authUtils.getAuthorized();
    this.currentGenderType = this.applicationUtils.currentGenderType;
    this.currentGenderType.subscribe(value => this.isCurrentWomanType = value === GenderType.Woman);
  }

  ngOnInit(): void {

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

  onClickLogout(): void {
    this.authUtils.logout();
  }

  private setCurrentGenderType(type: GenderType): void {
    this.applicationUtils.setCurrentGenderType(type);
  }
}
