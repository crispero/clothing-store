import { Component, Input, OnInit } from '@angular/core';
import { ClothesModel } from "../../../models/clothes.model";
import { CommentModel } from "../../../models/comment.model";
import { CommentRepository } from "../../../repositories/comment.repository";
import { MatDialog } from "@angular/material/dialog";
import { ICommentDto } from "../../../dto/comment.dto";
import { CommentDialogComponent, ICommentDialogData } from "../comment-dialog/comment-dialog.component";
import { CurrentUser } from "../../../utils/current-user";
import { Id } from "../../../models/id";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-comment-expansion-list',
  templateUrl: './comment-expansion-list.component.html',
  styleUrls: ['./comment-expansion-list.component.scss']
})
export class CommentExpansionListComponent implements OnInit {
  @Input() public clothes: ClothesModel;
  public clothesId: Id;
  public comments: CommentModel[];

  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly currentUser: CurrentUser,
    private dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.clothesId = this.activatedRoute.snapshot.params.id;
    this.comments = this.clothesId ? await this.commentRepository.getByClothesId(this.clothesId) : [];
  }

  openCommentDialog() {
    const dialogData: ICommentDialogData = { title: "Создание комментария" }
    const dialogRef = this.dialog.open(CommentDialogComponent, { data: dialogData, autoFocus: false });

    dialogRef.afterClosed().subscribe(async (commentDto: Partial<ICommentDto>) => {
      if (!!commentDto) {
        const commentToCreate: Partial<ICommentDto> = {
          ...commentDto,
          userId: this.currentUser.currentUserId,
          clothesId: this.clothes.clothesId,
          createdDate: new Date().toISOString()
        }
        const newComment = await this.commentRepository.create(commentToCreate);
        this.comments.push(newComment);
      }
    });
  }

  async onDeleteComment(id: Id): Promise<void> {
    const isDeleted = await this.commentRepository.delete(id);
    isDeleted && this.deleteOrChangeComment(id);
  }

  async onUpdateComment(commentDto: Partial<ICommentDto>): Promise<void> {
    const updatedComment = await this.commentRepository.update(commentDto.commentId!, commentDto);
    this.deleteOrChangeComment(commentDto.commentId!, updatedComment);
  }

  private deleteOrChangeComment(id: Id, comment?: CommentModel): void {
    const index = this.comments.findIndex(comment => comment.commentId === id);

    if (index === -1) return;

    if (comment) {
      this.comments.splice(index, 1, comment);
    } else {
      this.comments.splice(index, 1);
    }
  }
}
