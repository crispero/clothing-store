import { Component, OnInit } from '@angular/core';
import { UserRepository } from "../../../repositories/user.repository";
import { UserModel } from "../../../models/user.model";
import { IUserDto } from "../../../dto/user.dto";
import { UserType } from "../../../dto/user-type";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: UserModel[];

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.userRepository.getAll();
  }

  updateToAdmin(user: UserModel): void {
    this.changeUserRole(user, UserType.Admin);
  }

  updateToUser(user: UserModel): void {
    this.changeUserRole(user, UserType.User);
  }

  async changeUserRole(user: UserModel, userType: UserType): Promise<void> {
    const updateUser = await this.userRepository.update(user.userId, this.getUserData(user, userType));
    const index = this.users.findIndex(us => us.userId === user.userId);

    if (index !== -1) {
      this.users.splice(index, 1, updateUser);
    }
  }

  private getUserData(user: UserModel, userTypeId: number): Partial<IUserDto> {
    return {
      userId: user.userId,
      userTypeId,
      surname: user.surname,
      name: user.name,
      address: user.address,
      login: user.login,
      pictureUrl: user.pictureUrl,
      genderType: user.genderType
    }
  }
}
