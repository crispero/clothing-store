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
import { OrderListComponent } from "../components/order/order-list/order-list.component";
import { BrandListComponent } from "../components/brand/brand-list/brand-list.component";
import { UserListComponent } from "../components/user/user-list/user-list.component";
import { AdminOrderListComponent } from "../components/order/admin-order-list/admin-order-list.component";

const routes: Routes = [
  {
    path: RoutingPath.ClothesList,
    component: ClothesListComponent,
  //  canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.UserProfile,
    component: UserProfileComponent,
   // canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.Favorite,
    component: FavoriteComponent,
  //  canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.Basket,
    component: BasketComponent,
  //  canActivate: [AuthGuardService],
  },
  {
    path: `${RoutingPath.ClothesInfo}/:id`,
    component: ClothesInfoComponent,
   // canActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.Order,
    component: OrderListComponent,
    // camActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.AdminOrder,
    component: AdminOrderListComponent,
    // camActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.Brand,
    component: BrandListComponent,
    // camActivate: [AuthGuardService],
  },
  {
    path: RoutingPath.UserList,
    component: UserListComponent,
    // canActivate: [AuthGuardService],
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
