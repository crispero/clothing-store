import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderModel } from "../../../models/order.model";
import { ClothesModel } from "../../../models/clothes.model";
import { IOrderStatus, ORDER_STATUS_TYPE_LIST, OrderStatus } from "../../../dto/order-status";
import { DialogConfirmComponent, IConfirmDialogData } from "../../dialog-confirm/dialog-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { Id } from "../../../models/id";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() public order: OrderModel;
  @Input() public clothesList: ClothesModel[];
  public orderStatus: IOrderStatus | undefined;
  public canDeleteOrder: boolean;

  @Output() public onDeleteOrder = new EventEmitter<Id>();

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.orderStatus = ORDER_STATUS_TYPE_LIST.find(order => order.status.toString() === this.order.status.toString());
    this.canDeleteOrder = this.orderStatus?.status === OrderStatus.InTransit;
  }

  deleteOrder() {
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите отменить заказ?" };
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((isApply: boolean) => {
      if (isApply) {
        this.onDeleteOrder.emit(this.order.orderId);
      }
    })
  }
}
