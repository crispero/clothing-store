import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { CommentModel } from "../models/comment.model";
import { ICommentDto } from "../dto/comment.dto";
import { CommentService } from "../services/comment.service";
import { EntityMapper } from "../utils/entity-mapper";
import { Id } from "../models/id";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class CommentRepository extends BaseRepository<CommentModel, ICommentDto, CommentService> {
  constructor(service: CommentService, snackBar: MatSnackBar) {
    super(service, snackBar);
  }

  async getByClothesId(clothesId: Id): Promise<CommentModel[]> {
    const clothes = await this.service.getByClothesId(clothesId);
    return this.toEntities(clothes);
  }

  toEntities(data: ICommentDto[]): CommentModel[] {
    return EntityMapper.toDomainEntities(CommentModel, data);
  }

  toEntity(data: ICommentDto): CommentModel {
    return EntityMapper.toDomainEntity(CommentModel, data);
  }
}
