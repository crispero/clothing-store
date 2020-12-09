import { Component, OnInit } from '@angular/core';
import { AppRoutesService } from "../../routes/app-routes.service";
import { ApplicationUtils } from "../../utils/ApplicationUtils";
import { GenderType } from "../../utils/GenderType";
import { Observable } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentGenderType: Observable<GenderType>;

  constructor(
    private readonly appRoutesService: AppRoutesService,
    private readonly applicationUtils: ApplicationUtils,
  ) {
    this.currentGenderType = this.applicationUtils.currentGenderType;
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

  onClickManType(): void {
    this.setCurrentGenderType(GenderType.Man);
  }

  onClickWomanType(): void {
    this.setCurrentGenderType(GenderType.Woman);
  }

  private setCurrentGenderType(type: GenderType): void {
    this.applicationUtils.setCurrentGenderType(type);
  }
}
