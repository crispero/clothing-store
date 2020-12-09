import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.User);
  }
}
