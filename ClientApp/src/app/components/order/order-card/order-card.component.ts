import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderModel } from "../../../models/order.model";
import { ClothesModel } from "../../../models/clothes.model";
import { IOrderStatus, ORDER_STATUS_TYPE_LIST, OrderStatus } from "../../../dto/order-status";
import { DialogConfirmComponent, IConfirmDialogData } from "../../dialog-confirm/dialog-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { Id } from "../../../models/id";
import { CurrentUser } from "../../../utils/current-user";
import { IOrderDto } from "../../../dto/order.dto";

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
  public isAdmin: boolean = false;
  public orderStatusList = ORDER_STATUS_TYPE_LIST;

  @Output() public onDeleteOrder = new EventEmitter<Id>();
  @Output() public onChangeOrderStatus = new EventEmitter<Partial<IOrderDto>>();

  constructor(
    private dialog: MatDialog,
    private currentUser: CurrentUser,
  ) { }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.currentUser.isAdmin();
    this.orderStatus = ORDER_STATUS_TYPE_LIST.find(order => order.status.toString() === this.order.status.toString());
    this.canDeleteOrder = this.orderStatus?.status === OrderStatus.InProcessing;
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

  changeOrderStatus(status: OrderStatus) {
    this.onChangeOrderStatus.emit(this.getOrderDto(status))
  }

  getOrderDto(status: OrderStatus): Partial<IOrderDto> {
    return {
      orderId: this.order.orderId,
      status,
    }
  }
}
