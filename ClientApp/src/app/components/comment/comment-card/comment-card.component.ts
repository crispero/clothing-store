import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentModel } from "../../../models/comment.model";
import { UserRepository } from "../../../repositories/user.repository";
import { UserModel } from "../../../models/user.model";
import { ICommentDto } from "../../../dto/comment.dto";
import { Id } from "../../../models/id";
import { DialogConfirmComponent, IConfirmDialogData } from "../../dialog-confirm/dialog-confirm.component";
import { MatDialog } from "@angular/material/dialog";
import { ClothesDialogComponent, IClothesDialogData } from "../../clothes/clothes-dialog/clothes-dialog.component";
import { IClothesDto } from "../../../dto/clothes.dto";
import { CommentDialogComponent, ICommentDialogData } from "../comment-dialog/comment-dialog.component";
import { CurrentUser } from "../../../utils/current-user";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  public owner: UserModel;
  public isMyComment: boolean;
  @Input() comment: CommentModel;

  @Output() public onUpdateComment = new EventEmitter<Partial<ICommentDto>>();
  @Output() public onDeleteComment = new EventEmitter<Id>();

  constructor(
    private readonly userRepository: UserRepository,
    private readonly currentUser: CurrentUser,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.owner = await this.userRepository.getById(this.comment.userId);
    this.isMyComment = this.currentUser.currentUserId == this.owner.userId;
  }

  onClickDelete(): void {
    const dialogData: IConfirmDialogData = { title: "Вы действительно хотите удалить комментарий?"}
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((isApply: boolean) => {
      if (isApply) {
        this.onDeleteComment.emit(this.comment.commentId);
      }
    })
  }

  onClickEdit(): void {
    const dialogData: ICommentDialogData = { title: "Редактирование отзыва", comment: this.comment };
    const dialogRef = this.dialog.open(CommentDialogComponent, { data: dialogData, autoFocus: false });
    dialogRef.afterClosed().subscribe((comment: Partial<ICommentDto>) => {
      if (!!comment) {
        comment.createdDate = this.comment.createdDate;
        comment.commentId = this.comment.commentId;
        this.onUpdateComment.emit(comment);
      }
    })
  }

}
