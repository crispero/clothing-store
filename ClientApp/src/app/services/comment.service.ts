import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Injectable } from "@angular/core";
import { CommentModel } from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService<CommentModel> {
  constructor(
    protected http: HttpClient,
  ) {
    super(http, ApiResourceName.Comment);
  }
}
