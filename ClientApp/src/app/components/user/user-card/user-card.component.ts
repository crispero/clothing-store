import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() public onUpdateToAdmin = new EventEmitter<UserModel>();
  @Output() public onUpdateToUser = new EventEmitter<UserModel>();

  constructor(
    private readonly currentUser: CurrentUser,
  ) { }

  ngOnInit(): void {
    this.setUserType(this.user);
  }

  isAdmin(): boolean {
    return this.userType?.userType === UserType.Admin;
  }

  showAdminButton(): boolean {
    return this.currentUser.currentUserId !== this.user.userId;
  }

  async updateToAdmin(): Promise<void> {
    this.onUpdateToAdmin.emit(this.user);
  }

  async updateToUser(): Promise<void> {
    this.onUpdateToUser.emit(this.user);
  }

  private setUserType(user: UserModel | null): void {
    this.userType = USER_TYPE_LIST.find(userType =>
      userType.userType === user?.userTypeId);
  }
}
