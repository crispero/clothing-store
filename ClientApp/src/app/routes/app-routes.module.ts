import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingPath } from "./routes-path";
import { ClothesListComponent } from "../components/clothes/clothes-list/clothes-list.component";
import { UserProfileComponent } from "../components/user/user-profile/user-profile.component";
import { FavoriteComponent } from "../components/favorite/favorite.component";
import { BasketComponent } from "../components/basket/basket.component";
import { RegisterComponent } from "../components/register/register.component";
import { LoginComponent } from "../components/login/login.component";
import { ClothesInfoComponent } from "../components/clothes/clothes-info/clothes-info.component";
import { AuthGuardService } from "../guard/auth-guard.service";

const routes: Routes = [
  {
    path: RoutingPath.ClothesList,
    component: ClothesListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.UserProfile,
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.Favorite,
    component: FavoriteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.Basket,
    component: BasketComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: `${RoutingPath.ClothesInfo}/:id`,
    component: ClothesInfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.Register,
    component: RegisterComponent,
  },
  {
    path: RoutingPath.Login,
    component: LoginComponent,
  },
  {
    path: "**",
    redirectTo: "",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
