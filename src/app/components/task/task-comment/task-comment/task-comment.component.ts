import { Component, Input, OnInit } from '@angular/core';
import { commentDTO } from 'src/app/DTOs/CommentDTO';
import { getCurrentUserName } from 'src/app/helpers/localStorage';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.scss'],
})
export class TaskCommentComponent implements OnInit {
  @Input() _data: commentDTO;

  user: string;
  constructor() {}

  ngOnInit(): void {
    this.user = getCurrentUserName();
  }

  removeComment() {}
  updateCommentByID() {}
}
