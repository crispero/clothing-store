import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { IUserDto } from "../dto/user.dto";
import { UserService } from "../services/user.service";
import { EntityMapper } from "../utils/entity-mapper";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class UserRepository extends BaseRepository<UserModel, IUserDto, UserService> {
  constructor(service: UserService, snackBar: MatSnackBar) {
    super(service, snackBar);
  }

  toEntities(data: IUserDto[]): UserModel[] {
    return EntityMapper.toDomainEntities(UserModel, data);
  }

  toEntity(data: IUserDto): UserModel {
    return EntityMapper.toDomainEntity(UserModel, data);
  }
}
