import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { OrderModel } from "../../../models/order.model";
import { CurrentUser } from "../../../utils/current-user";

export interface IOrderDialogData {
  title: string;
  order?: OrderModel;
}

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  public title: string;
  public formGroup: FormGroup;
  public isCustomAddress: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    private formBuilder: FormBuilder,
    private currentUser: CurrentUser,
    @Inject(MAT_DIALOG_DATA) private dialogData: IOrderDialogData,
  ) { }

  ngOnInit(): void {
    const { order, title} = this.dialogData;

    const currentUser = this.currentUser.currentUser;

    this.formGroup = this.formBuilder.group({
      deliveryAddress: [order?.deliveryAddress || currentUser?.address || "", [Validators.required]],
      price: [order?.price || "", [Validators.required]],
    });

    this.title = title;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    this.dialogRef.close(value);
  }

  onChangeCheckbox(value: boolean): void {
    this.isCustomAddress = value;
  }
}
