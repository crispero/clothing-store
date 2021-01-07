import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandModel } from "../../../models/brand.model";
import { DialogConfirmComponent, IConfirmDialogData } from "../../dialog-confirm/dialog-confirm.component";
import { BrandDialogComponent, IBrandDialogData } from "../brand-dialog/brand-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { IBrandDto } from "../../../dto/brand.dto";
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

  @Output() public onEditBrand = new EventEmitter<Partial<IBrandDto>>();

  @Output() public onDeleteBrand = new EventEmitter<Id>();

  constructor(
    private dialog: MatDialog,
    private readonly currentUser: CurrentUser,
    private readonly attachmentRepository: AttachmentRepository,
  ) { }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.currentUser.isAdmin();
  }

  onClickEdit(): void {
    const dialogData: IBrandDialogData = { title: "Редактирование бренда", brand: this.brand }
    const dialogRef = this.dialog.open(BrandDialogComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((brand: Partial<IBrandDto>) => {
      if (!!brand) {
        this.onEditBrand.emit({ brandId: this.brand.brandId, ...brand });
      }
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

  getFilePath(fileName: string): string {
    return !!fileName ? this.attachmentRepository.getFilePath(fileName) : "";
  }
}
