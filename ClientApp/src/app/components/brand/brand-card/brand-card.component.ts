import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandModel } from "../../../models/brand.model";
import { DialogConfirmComponent, IConfirmDialogData } from "../../dialog-confirm/dialog-confirm.component";
import { BrandDialogComponent, IBrandDialogData, IBrandDialogResponse } from "../brand-dialog/brand-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Id } from "../../../models/id";
import { CurrentUser } from "../../../utils/current-user";
import { AttachmentRepository } from "../../../repositories/attachment.repository";

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent implements OnInit {
  @Input() brand: BrandModel;
  @Input() showButtons: boolean;

  public isAdmin: boolean;

  public defaultAvatarName: string;

  @Output() public onEditBrand = new EventEmitter<IBrandDialogResponse>();

  @Output() public onDeleteBrand = new EventEmitter<Id>();

  constructor(
    private dialog: MatDialog,
    private readonly currentUser: CurrentUser,
    private readonly attachmentRepository: AttachmentRepository,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.currentUser.isAdmin();
    this.defaultAvatarName = this.attachmentRepository.defaultAvatarName;
  }

  onClickEdit(): void {
    const dialogData: IBrandDialogData = { title: "Редактирование бренда", brand: this.brand }
    const dialogRef = this.dialog.open(BrandDialogComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((response: IBrandDialogResponse) => {
      if (!response) return;
      this.onEditBrand.emit({ ...response, brand: { brandId: this.brand.brandId, ...response.brand } });
    })
  }

  onClickDelete(): void {
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите удалить бренд?" }
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((isApply: boolean) => {
      if (isApply) {
        this.onDeleteBrand.emit(this.brand.brandId);
      }
    })
  }

  getFilePath(fileName?: string): string {
    const name = fileName || this.defaultAvatarName;
    return !!name ? this.attachmentRepository.getFilePath(name) : "";
  }
}
