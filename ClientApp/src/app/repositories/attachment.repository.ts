import { Injectable } from "@angular/core";
import { BaseRepository } from "./base.repository";
import { AttachmentModel } from "../models/attachment.model";
import { IAttachmentDto } from "../dto/attachment.dto";
import { AttachmentService } from "../services/attachment.service";
import { EntityMapper } from "../utils/entity-mapper";
import { ClientException } from "../utils/client-exception";

@Injectable({
  providedIn: "root"
})
export class AttachmentRepository extends BaseRepository<AttachmentModel, IAttachmentDto, AttachmentService> {
  constructor(service: AttachmentService) {
    super(service);
  }

  getUrlUploadFile(file: File): string {
    return URL.createObjectURL(file);
  }

  getFilePath(fileName: string): string {
    return this.service.getFilePath(fileName);
  }

  async uploadFile(file: File): Promise<IAttachmentDto> {
    try {
      return await this.service.uploadFile(file);
    } catch (e) {
      throw new ClientException("File not upload");
    }
  }

  async updateFile(fileName: string, file: File): Promise<IAttachmentDto> {
    try {
      return await this.service.updateFile(fileName, file);
    } catch (e) {
      throw new ClientException("File not updated");
    }
  }

  async deleteFile(fileName: string): Promise<boolean> {
    try {
      return await this.service.deleteFile(fileName);
    } catch (e) {
      throw new ClientException("File not deleted");
    }
  }

  protected toEntities(data: IAttachmentDto[]): AttachmentModel[] {
    return EntityMapper.toDomainEntities(AttachmentModel, data);
  }

  protected toEntity(data: IAttachmentDto): AttachmentModel {
    return EntityMapper.toDomainEntity(AttachmentModel, data);
  }
}
