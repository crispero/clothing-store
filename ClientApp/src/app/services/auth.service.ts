import { Inject, Injectable } from "@angular/core";
import { ILoginDto } from "../dto/login.dto";
import { IAuthDto } from "../dto/auth.dto";
import { ApiResourceName } from "./api-resource-name";
import { HttpClient } from "@angular/common/http";
import { IRegisterDto } from "../dto/register.dto";
import { SERVICE_URL } from "../app-injection-tokens";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject(SERVICE_URL) private readonly serviceUrl: string,
  ) {
  }

  loginUser(loginDto: ILoginDto): Promise<IAuthDto> {
    const url = this.serviceUrl + ApiResourceName.Login;
    return this.http.post<IAuthDto>(url, loginDto).toPromise();
  }

  registerUser(registerDto: IRegisterDto): Promise<IAuthDto> {
    const url = this.serviceUrl + ApiResourceName.Register;
    return this.http.post<IAuthDto>(url, registerDto).toPromise();
  }
}
