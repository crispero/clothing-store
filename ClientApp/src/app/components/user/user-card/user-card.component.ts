import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from "../../../models/user.model";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;

  constructor() { }

  ngOnInit(): void {
  }

}
