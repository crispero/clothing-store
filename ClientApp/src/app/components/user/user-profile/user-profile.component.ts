import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CurrentUser } from "../../../utils/current-user";
import { UserRepository } from "../../../repositories/user.repository";
import { GENDER_TYPE_LIST, IGenderType } from "../../../dto/gender-type";
import { AttachmentRepository } from "../../../repositories/attachment.repository";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public formGroup: FormGroup;
  public genderTypeList: IGenderType[] = GENDER_TYPE_LIST;
  public imageFile: File | undefined;
  public previewUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private readonly currentUser: CurrentUser,
    private readonly userRepository: UserRepository,
    private readonly attachmentRepository: AttachmentRepository,
  ) { }

  async ngOnInit(): Promise<void> {
    let currentUser = this.currentUser.currentUser;

    if (!currentUser) {
      currentUser = await this.userRepository.getById(this.currentUser.currentUserId)
    }

    this.formGroup = this.formBuilder.group({
      login: [currentUser?.login || ""],
      name: [currentUser?.name || ""],
      surname: [currentUser?.surname || ""],
      address: [currentUser?.address || ""],
      genderType: [currentUser?.genderType || 0],
      pictureUrl: [currentUser?.pictureUrl || ""],
      password: [""],
      userTypeId: [currentUser?.userTypeId || ""]
    });

    this.previewUrl = this.getFilePath(currentUser?.pictureUrl);
  }

  setImageFile(file?: File): void {
    this.imageFile = file;
  }

  setPreviewUrl(value: string): void {
    this.previewUrl = value;
  }

  getFilePath(fileName?: string): string {
    return !!fileName ? this.attachmentRepository.getFilePath(fileName) : "";
  }

  isDeletePicture(): boolean {
    const value = this.formGroup.value;
    return !!value?.pictureUrl && !this.imageFile && !this.previewUrl;
  }

  async onSubmit(): Promise<void> {
    const value = this.formGroup.value;
    console.log(value);
    const currentUserId = this.currentUser.currentUserId;

    if (!!this.imageFile) {
      const file = !!value?.pictureUrl
        ? await this.attachmentRepository.updateFile(value.pictureUrl, this.imageFile)
        : await this.attachmentRepository.uploadFile(this.imageFile);
      value.pictureUrl = file.path;
    } else if (this.isDeletePicture() && !!value.pictureUrl) {
      await this.attachmentRepository.deleteFile(value.pictureUrl);
      value.pictureUrl = "";
    }

    const user = await this.userRepository.update(currentUserId, value);
    this.currentUser.setCurrentUser(user);
  }
}
