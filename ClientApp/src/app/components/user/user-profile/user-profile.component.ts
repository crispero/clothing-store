import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrentUser } from "../../../utils/current-user";
import { UserRepository } from "../../../repositories/user.repository";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly currentUser: CurrentUser,
    private readonly userRepository: UserRepository,
  ) { }

  ngOnInit(): void {
    const currentUser = this.currentUser.currentUser;
    this.formGroup = this.formBuilder.group({
      login: [currentUser?.login || ""],
      name: [currentUser?.name || ""],
      surname: [currentUser?.surname || ""],
      address: [currentUser?.address || ""],
      genderType: [currentUser?.genderType || ""],
      pictureUrl: [currentUser?.pictureUrl || ""],
      password: [""]
    });
  }

  async onSubmit(): Promise<void> {
    const value = this.formGroup.value;
    console.log(value);
    const currentUserId = this.currentUser.currentUserId;
    const user = await this.userRepository.update(currentUserId, value);
    this.currentUser.setCurrentUser(user);
  }
}
