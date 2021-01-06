import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClothesModel } from "../../../models/clothes.model";
import { FavoriteRepository } from "../../../repositories/favorite.repository";
import { BasketRepository } from "../../../repositories/basket.repository";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent, IConfirmDialogData } from "../../dialog-confirm/dialog-confirm.component";
import { ClothesDialogComponent, IClothesDialogData } from "../clothes-dialog/clothes-dialog.component";
import { IClothesDto } from "../../../dto/clothes.dto";
import { AppRoutesService } from "../../../routes/app-routes.service";
import { CurrentUser } from "../../../utils/current-user";
import { BrandModel } from "../../../models/brand.model";
import { GENDER_TYPE_LIST, IGenderType } from "../../../dto/gender-type";
import { CLOTHES_SIZE_LIST, IClothesSize } from "../../../dto/clothes-size";
import { Id } from "../../../models/id";

@Component({
  selector: 'app-clothes-card',
  templateUrl: './clothes-card.component.html',
  styleUrls: ['./clothes-card.component.scss']
})
export class ClothesCardComponent implements OnInit {
  @Input() public clothes: ClothesModel;
  @Input() public brands: BrandModel[];
  @Input() public showFavoriteButton: boolean = true;
  @Input() public showBasketButton: boolean = true;
  @Input() public showInfoButton: boolean = true;
  @Input() public showEditButton: boolean = true;
  @Input() public showDeleteButton: boolean = true;
  @Input() public showCloseButton: boolean = false;

  public isAdmin: boolean;
  public genderType: IGenderType | undefined;
  public size: IClothesSize | undefined;

  @Output() public onUpdateClothes = new EventEmitter<Partial<IClothesDto>>();
  @Output() public onDeleteClothes = new EventEmitter<Id>();
  @Output() public onClickCloseButton = new EventEmitter<Id>();
  @Output() public onClickFavorite = new EventEmitter<Id>();
  @Output() public onClickBasket = new EventEmitter<Id>();

  constructor(
    private readonly appRoutesService: AppRoutesService,
    private dialog: MatDialog,
    private readonly currentUser: CurrentUser
  ) { }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.currentUser.isAdmin();
    this.genderType = GENDER_TYPE_LIST.find(gender => gender.genderType === this.clothes.genderType);
    this.size = CLOTHES_SIZE_LIST.find(size => size.size === this.clothes.size);
  }

  onSelectItem(): void {
    this.appRoutesService.goToClothesInfoPage(this.clothes.clothesId);
  }

  onClickEdit() {
    const dialogData: IClothesDialogData = { title: "Редактирование одежды", clothes: this.clothes, brands: this.brands }
    const dialogRef = this.dialog.open(ClothesDialogComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((clothes: Partial<IClothesDto>) => {
      if (!!clothes) {
        clothes.clothesId = this.clothes.clothesId;
        this.onUpdateClothes.emit(clothes);
      }
    })
  }

  onClickDelete() {
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите удалить одежду?" };
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((isApply: boolean) => {
      if (isApply) {
        this.onDeleteClothes.emit(this.clothes.clothesId);
      }
    })
  }

  addToFavorite(): void {
    this.onClickFavorite.emit(this.clothes.clothesId);
  }

  addToBasket(): void {
    this.onClickBasket.emit(this.clothes.clothesId);
  }

  onClickClose(): void {
    this.onClickCloseButton.emit(this.clothes.clothesId);
  }
}
