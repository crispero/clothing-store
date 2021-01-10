import { Component, OnInit } from '@angular/core';
import { AppRoutesService } from "../../routes/app-routes.service";
import { Observable } from "rxjs";
import { AuthUtils } from "../../utils/auth.utils";
import { CurrentUser } from "../../utils/current-user";
import { DialogConfirmComponent, IConfirmDialogData } from "../dialog-confirm/dialog-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { UserRepository } from "../../repositories/user.repository";
import { RoutingPath } from "../../routes/routes-path";

interface IMenu {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public authorized$: Observable<boolean>;
  public menuList: IMenu[] = [
    {
      title: "Пользователи",
      route: RoutingPath.UserList,
      icon: "supervisor_account",
    },
    {
      title: "Бренды",
      route: RoutingPath.Brand,
      icon: "branding_watermark",
    },
    {
      title: "Заказы",
      route: RoutingPath.AdminOrder,
      icon: "admin_panel_settings",
    },
  ]

  constructor(
    private readonly appRoutesService: AppRoutesService,
    private readonly authUtils: AuthUtils,
    private readonly currentUser: CurrentUser,
    private readonly userRepository: UserRepository,
    private dialog: MatDialog,
  ) {
    this.authorized$ = authUtils.getAuthorized();
  }

  ngOnInit() {
  }

  onClickHome(): void {
    this.appRoutesService.goToClothesPage();
  }

  isAdmin(): boolean {
    return this.currentUser.isAdmin();
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
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите выйти?" }
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((isApply: boolean) => {
      if (isApply) {
        this.authUtils.logout();
      }
    })
  }
}
