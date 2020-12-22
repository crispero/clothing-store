import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthUtils } from "../../utils/AuthUtils";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authUtils: AuthUtils,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]],
      name: "",
      surname: "",
    });
  }

  async onSubmit(): Promise<void> {
    const value = this.formGroup.value;
    await this.authUtils.register(value);
  }
}
