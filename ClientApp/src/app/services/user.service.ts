import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Inject, Injectable } from "@angular/core";
import { IUserDto } from "../dto/user.dto";
import { SERVICE_URL } from "../app-injection-tokens";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<IUserDto> {
  constructor(
    protected http: HttpClient,
    @Inject(SERVICE_URL) readonly serviceUrl: string,
  ) {
    super(http, serviceUrl, ApiResourceName.User);
  }
}
