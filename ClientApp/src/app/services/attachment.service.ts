import { BaseService } from "./base.service";
import { IAttachmentDto } from "../dto/attachment.dto";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { SERVICE_URL } from "../app-injection-tokens";
import { ApiResourceName } from "./api-resource-name";

@Injectable({
  providedIn: "root"
})
export class AttachmentService extends BaseService<IAttachmentDto> {
  constructor(
    protected http: HttpClient,
    @Inject(SERVICE_URL) readonly serviceUrl: string,
  ) {
    super(http, serviceUrl, ApiResourceName.Attachment);
  }

  getFilePath(fileName: string): string {
    return `${this.apiUrl}/${fileName}`;
  }

  uploadFile(file: File): Promise<IAttachmentDto> {
    const url = `${this.apiUrl}/upload`;
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<IAttachmentDto>(url, formData).toPromise();
  }

  updateFile(fileName: string, file: File): Promise<IAttachmentDto> {
    const url = `${this.apiUrl}/${fileName}`;
    const formData = new FormData();
    formData.append("file", file);

    return this.http.patch<IAttachmentDto>(url, formData).toPromise();
  }

  deleteFile(fileName: string): Promise<boolean> {
    const url = `${this.apiUrl}/${fileName}`;
    return this.http.delete<boolean>(url).toPromise();
  }
}
