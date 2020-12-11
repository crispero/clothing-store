import { BaseRepository } from "./base.repository";
import { EntityMapper } from "../utils/EntityMapper";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { IUserDto } from "../dto/user.dto";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class UserRepository extends BaseRepository<UserModel, IUserDto, UserService> {
  constructor(service: UserService) {
    super(service);
  }

  toEntities(data: IUserDto[]): UserModel[] {
    return EntityMapper.toDomainEntities(UserModel, data);
  }

  toEntity(data: IUserDto): UserModel {
    return EntityMapper.toDomainEntity(UserModel, data);
  }
}
