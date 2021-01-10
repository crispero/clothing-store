import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommentModel } from "../../../models/comment.model";

export interface ICommentDialogData {
  title: string;
  comment?: CommentModel;
}

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  public title: string;
  public formGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CommentDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: ICommentDialogData,
  ) { }

  ngOnInit(): void {
    const comment = this.dialogData?.comment;

    this.formGroup = this.formBuilder.group({
      text: [comment?.text || "", [Validators.required]],
    });

    this.title = this.dialogData.title;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const value = this.formGroup.value;
    this.dialogRef.close(value);
  }
}
