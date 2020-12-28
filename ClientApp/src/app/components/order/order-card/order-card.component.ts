import { Component, Input, OnInit } from '@angular/core';
import { OrderModel } from "../../../models/order.model";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() public order: OrderModel;

  constructor() { }

  ngOnInit(): void {
  }

}
