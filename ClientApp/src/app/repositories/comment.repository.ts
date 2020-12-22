﻿import { BaseRepository } from "./base.repository";
import { EntityMapper } from "../utils/EntityMapper";
import { Injectable } from "@angular/core";
import { CommentModel } from "../models/comment.model";
import { ICommentDto } from "../dto/comment.dto";
import { CommentService } from "../services/comment.service";

@Injectable({
  providedIn: "root"
})
export class CommentRepository extends BaseRepository<CommentModel, ICommentDto, CommentService> {
  constructor(service: CommentService) {
    super(service);
  }

  toEntities(data: ICommentDto[]): CommentModel[] {
    return EntityMapper.toDomainEntities(CommentModel, data);
  }

  toEntity(data: ICommentDto): CommentModel {
    return EntityMapper.toDomainEntity(CommentModel, data);
  }
}