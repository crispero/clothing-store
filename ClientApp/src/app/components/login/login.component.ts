import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppRoutesService } from "../../routes/app-routes.service";
import { AuthUtils } from "../../utils/auth.utils";
import { ApplicationUtils } from "../../utils/application.utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public isVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authUtils: AuthUtils,
    private readonly appRoutesService: AppRoutesService,
    private readonly applicationUtils: ApplicationUtils,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ["", [Validators.required, Validators.minLength(this.applicationUtils.loginMinLength)]],
      password: ["", [Validators.required, Validators.pattern(this.applicationUtils.passwordPattern)]],
    });
  }

  get login(): AbstractControl {
    return <AbstractControl>this.formGroup.get("login");
  }

  get password(): AbstractControl {
    return <AbstractControl>this.formGroup.get("password");
  }

  getLoginErrorMessage(): string {
    if (this.login.hasError("required")) {
      return "Поле логина обязательно к заполнению";
    }

    return this.login.hasError("minlength") ? this.applicationUtils.loginErrorText : "";
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError("required")) {
      return "Поле пароля обязательно к заполнению";
    }

    return this.password.hasError("pattern") ? this.applicationUtils.passwordErrorText : "";
  }

  async onSubmit(): Promise<void> {
    const value = this.formGroup.value;
    await this.authUtils.login(value);
  }

  goToRegisterPage(): void {
    this.appRoutesService.goToRegisterPage();
  }
}
