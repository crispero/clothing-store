import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrentUser } from "../../../utils/current-user";
import { UserRepository } from "../../../repositories/user.repository";
import { GENDER_TYPE_LIST, IGenderType } from "../../../dto/gender-type";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public formGroup: FormGroup;
  public genderTypeList: IGenderType[] = GENDER_TYPE_LIST;

  constructor(
    private formBuilder: FormBuilder,
    private readonly currentUser: CurrentUser,
    private readonly userRepository: UserRepository,
  ) { }

  async ngOnInit(): Promise<void> {
    let currentUser = this.currentUser.currentUser;

    if (!currentUser) {
      currentUser = await this.userRepository.getById(this.currentUser.currentUserId)
    }

    this.formGroup = this.formBuilder.group({
      login: [currentUser?.login || ""],
      name: [currentUser?.name || ""],
      surname: [currentUser?.surname || ""],
      address: [currentUser?.address || ""],
      genderType: [currentUser?.genderType || ""],
      pictureUrl: [currentUser?.pictureUrl || ""],
      password: [""],
      userTypeId: [currentUser?.userTypeId || ""]
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
