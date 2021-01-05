import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from "../../../models/user.model";
import { IUserType, USER_TYPE_LIST, UserType } from "../../../dto/user-type";
import { CurrentUser } from "../../../utils/current-user";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;
  public userType: IUserType | undefined;

  constructor(
    private readonly currentUser: CurrentUser,
  ) { }

  ngOnInit(): void {
    const currentUser = this.currentUser.currentUser;

    this.userType = USER_TYPE_LIST.find(userType =>
      userType.userType.toString() === currentUser?.userTypeId.toString());
  }

  isAdmin(): boolean {
    return this.userType?.userType.toString() === UserType.Admin.toString();
  }

}
