import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrentUser } from "../../../utils/CurrentUser";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const currentUser = CurrentUser.currentUser;
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

  onSubmit(): void {
    const value = this.formGroup.value;
    console.log(value);
  }
}
