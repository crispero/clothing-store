import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { IUserDto } from "../dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<IUserDto> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.User);
  }
}
