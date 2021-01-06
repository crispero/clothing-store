import { Component, OnInit } from '@angular/core';
import { AppRoutesService } from "../../routes/app-routes.service";
import { Observable } from "rxjs";
import { AuthUtils } from "../../utils/auth.utils";
import { CurrentUser } from "../../utils/current-user";
import { DialogConfirmComponent, IConfirmDialogData } from "../dialog-confirm/dialog-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { UserRepository } from "../../repositories/user.repository";
import { UserType } from "../../dto/user-type";

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
    private readonly currentUser: CurrentUser,
    private readonly userRepository: UserRepository,
    private dialog: MatDialog,
  ) {
    this.authorized$ = authUtils.getAuthorized();
  }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.currentUser.isAdmin();
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

  onClickUserList(): void {
    this.appRoutesService.goToUserListPage();
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
