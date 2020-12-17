import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingPath } from "./routes-path";
import { ClothesListComponent } from "../components/clothes/clothes-list/clothes-list.component";
import { UserProfileComponent } from "../components/user/user-profile/user-profile.component";
import { FavoriteComponent } from "../components/favorite/favorite.component";
import { BasketComponent } from "../components/basket/basket.component";
import { RegisterComponent } from "../components/register/register.component";
import { LoginComponent } from "../components/login/login.component";

const routes: Routes = [
  {
    path: RoutingPath.ClothesList,
    component: ClothesListComponent,
  },
  {
    path: RoutingPath.UserProfile,
    component: UserProfileComponent,
  },
  {
    path: RoutingPath.Favorite,
    component: FavoriteComponent,
  },
  {
    path: RoutingPath.Basket,
    component: BasketComponent,
  },
  {
    path: RoutingPath.Register,
    component: RegisterComponent,
  },
  {
    path: RoutingPath.Login,
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
