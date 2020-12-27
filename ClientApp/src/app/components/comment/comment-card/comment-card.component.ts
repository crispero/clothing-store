import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from "../../../models/comment.model";
import { UserRepository } from "../../../repositories/user.repository";
import { UserModel } from "../../../models/user.model";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  public owner: UserModel;
  @Input() comment: CommentModel;

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async ngOnInit(): Promise<void> {
    this.owner = await this.userRepository.getById(this.comment.userId);
  }

  onClickDelete(): void {}

  onClickEdit(): void {}

}
