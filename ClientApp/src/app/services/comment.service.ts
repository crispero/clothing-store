import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { ICommentDto } from "../dto/comment.dto";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService<ICommentDto> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Comment);
  }
}
