import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from "../../../models/user.model";
import { IUserType, USER_TYPE_LIST, UserType } from "../../../dto/user-type";
import { CurrentUser } from "../../../utils/current-user";
import { AttachmentRepository } from "../../../repositories/attachment.repository";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;
  public userType: IUserType | undefined;
  public defaultAvatarName: string;

  @Output() public onUpdateToAdmin = new EventEmitter<UserModel>();
  @Output() public onUpdateToUser = new EventEmitter<UserModel>();

  constructor(
    private readonly currentUser: CurrentUser,
    private readonly attachmentRepository: AttachmentRepository,
  ) { }

  ngOnInit(): void {
    this.setUserType(this.user);
    this.defaultAvatarName = this.attachmentRepository.defaultAvatarName;
  }

  isAdmin(): boolean {
    return this.userType?.userType === UserType.Admin;
  }

  showAdminButton(): boolean {
    return this.currentUser.currentUserId !== this.user.userId;
  }

  getFilePath(fileName?: string): string {
    const name = fileName || this.defaultAvatarName;
    return !!name ? this.attachmentRepository.getFilePath(name) : "";
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
