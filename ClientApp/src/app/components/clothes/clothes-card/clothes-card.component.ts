import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClothesModel } from "../../../models/clothes.model";
import { FavoriteRepository } from "../../../repositories/favorite.repository";
import { BasketRepository } from "../../../repositories/basket.repository";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent, IConfirmDialogData } from "../../dialog-confirm/dialog-confirm.component";
import { ClothesRepository } from "../../../repositories/clothes.repository";
import { ClothesDialogComponent, IClothesDialogData } from "../clothes-dialog/clothes-dialog.component";
import { IClothesDto } from "../../../dto/clothes.dto";
import { AppRoutesService } from "../../../routes/app-routes.service";
import { CurrentUser } from "../../../utils/current-user";

@Component({
  selector: 'app-clothes-card',
  templateUrl: './clothes-card.component.html',
  styleUrls: ['./clothes-card.component.scss']
})
export class ClothesCardComponent implements OnInit {
  @Input() public clothes: ClothesModel;
  public isAdmin: boolean;

  @Output() public changeEventData = new EventEmitter<ClothesModel>();

  constructor(
    private readonly clothesRepository: ClothesRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly basketRepository: BasketRepository,
    private readonly appRoutesService: AppRoutesService,
    private dialog: MatDialog,
    private readonly currentUser: CurrentUser
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.currentUser.isAdmin();
  }

  onSelectItem(): void {
    this.appRoutesService.goToClothesInfoPage(this.clothes.clothesId);
  }

  onClickEdit() {
    const dialogData: IClothesDialogData = { title: "Редактирование одежды", clothes: this.clothes }
    const dialogRef = this.dialog.open(ClothesDialogComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((clothes: IClothesDto) => {
      if (!!clothes) {
        this.clothesRepository.update(this.clothes.clothesId, clothes);
      }
    })
  }

  onClickDelete() {
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите удалить одежду?", description: ""}
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((isApply: boolean) => {
      if (isApply) {
        this.clothesRepository.delete(this.clothes.clothesId);
      }
    })
  }

  addToFavorite(): void {
    const sendData = this.getSendData();

    this.favoriteRepository.create(sendData);
  }

  addToBasket(): void {
    const sendData = this.getSendData();

    this.basketRepository.create(sendData);
  }

  private getSendData() {
    const userId = this.currentUser.currentUserId;

    return {
      userId,
      clothesId: this.clothes.clothesId,
    }
  }
}
