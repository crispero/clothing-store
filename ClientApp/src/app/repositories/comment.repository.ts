import { BaseRepository } from "./base.repository";
import { Injectable } from "@angular/core";
import { CommentModel } from "../models/comment.model";
import { ICommentDto } from "../dto/comment.dto";
import { CommentService } from "../services/comment.service";
import { EntityMapper } from "../utils/entity-mapper";
import { Id } from "../models/id";

@Injectable({
  providedIn: "root"
})
export class CommentRepository extends BaseRepository<CommentModel, ICommentDto, CommentService> {
  constructor(service: CommentService) {
    super(service);
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
