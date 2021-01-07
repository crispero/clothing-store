import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AttachmentRepository } from "../../repositories/attachment.repository";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() public previewUrl: string;

  @Output() public changePreviewUrl = new EventEmitter<string>();
  @Output() public changeImageFile = new EventEmitter<File>();

  constructor(
    private attachmentRepository: AttachmentRepository) {
  }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    if (!!event.target.files?.length) {
      const file: File= event.target.files[0];
      this.changeImageFile.emit(file);
      this.changePreviewUrl.emit(this.attachmentRepository.getUrlUploadFile(file));
    }
  }

  onDeletePicture(): void {
    this.changeImageFile.emit();
    this.changePreviewUrl.emit("");
  }
}
