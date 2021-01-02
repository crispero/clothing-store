import { Component, OnInit } from '@angular/core';
import { UserRepository } from "../../../repositories/user.repository";
import { UserModel } from "../../../models/user.model";

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
}
