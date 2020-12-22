import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { ApiResourceName } from "./api-resource-name";
import { Inject, Injectable } from "@angular/core";
import { ICommentDto } from "../dto/comment.dto";
import { SERVICE_URL } from "../app-injection-tokens";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService<ICommentDto> {
  constructor(
    protected http: HttpClient,
    @Inject(SERVICE_URL) readonly serviceUrl: string,
  ) {
    super(http, serviceUrl, ApiResourceName.Comment);
  }
}
