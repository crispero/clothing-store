import { Component } from '@angular/core';
import { UserRepository } from "./repositories/user.repository";
import { CurrentUser } from "./utils/current-user";
import { LocalStorageUtils } from "./utils/local-storage.utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly localStorageUtils: LocalStorageUtils,
    private readonly currentUser: CurrentUser
  ) {
    this.initCurrentUser();
  }

  async initCurrentUser() {
    const userId = this.localStorageUtils.getUserId();

    if (userId) {
      const user = await this.userRepository.getById(userId);
      this.currentUser.setCurrentUser(user);
    }
  }
}
