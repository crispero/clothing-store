import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RoutingPath } from "./routes-path";
import { Id } from "../models/id";

@Injectable({
  providedIn: "root"
})

export class AppRoutesService {
  constructor(private router: Router) {
  }

  goToClothesPage(): void {
    this.router.navigateByUrl(RoutingPath.ClothesList);
  }

  goToUserProfilePage(): void {
    this.router.navigateByUrl(RoutingPath.UserProfile);
  }

  goToFavoritePage(): void {
    this.router.navigateByUrl(RoutingPath.Favorite);
  }

  goToBasketPage(): void {
    this.router.navigateByUrl(RoutingPath.Basket);
  }

  goToClothesInfoPage(id: Id): void {
    this.router.navigateByUrl(`${RoutingPath.ClothesInfo}/${id}`)
  }

  goToOrderPage(): void {
    this.router.navigateByUrl(RoutingPath.Order);
  }

  goToBrandPage(): void {
    this.router.navigateByUrl(RoutingPath.Brand);
  }

  goToLoginPage(): void {
    this.router.navigateByUrl(RoutingPath.Login);
  }

  goToRegisterPage(): void {
    this.router.navigateByUrl(RoutingPath.Register);
  }
}
