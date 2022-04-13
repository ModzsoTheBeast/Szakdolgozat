import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { commentDTO } from 'src/app/DTOs/CommentDTO';
import { contributorsDTO } from 'src/app/DTOs/ContributorDTO';
import { taskDetailDTO } from 'src/app/DTOs/TaskDTO';
import { taskListDTO } from 'src/app/DTOs/TaskListDTO';
import {
  getCurrentUserID,
  getCurrentUserName,
} from 'src/app/helpers/localStorage';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  dummyData: taskDetailDTO = {
    name: 'dummy name',
    done: false,
    contributors: [
      {
        id: 1,
        name: 'laci',
        role: 'dev',
      },
      {
        id: 1,
        name: 'erik',
        role: 'dev',
      },
    ],
    cretedBy: 'dummy',
    createdOn: new Date(),
    desc: 'asdadsadsasd assda sdads da ssa d',
    comments: [
      {
        id: 1,
        createdBy: 'dummy',
        createdOn: new Date(),
        text: 'asdasdasds',
      },
    ],
    deadline: new Date(),
    taskLists: [
      {
        id: 1,
        name: 'list1',
        items: [
          { name: 'item 1', isDone: true },
          { name: 'item 2', isDone: false },
        ],
      },
    ],
  };
  taskForm: FormGroup;
  commentForm: FormGroup;
  taskListForm: FormGroup;
  taskData: taskDetailDTO;
  contributors: contributorsDTO[];
  comments: commentDTO[];
  taskLists: taskListDTO[];
  taskID: number;
  nameEdit: Boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService
  ) {}

  ngOnInit(): void {
    this.createTaskForm();
    this.createCommentForm();
    this.taskID = this.data.id;
    this.taskService.getDetailedTaskDataByTaskID(this.taskID).subscribe(
      (resoult) => {
        this.taskData = resoult;
      },
      (error: HttpErrorResponse) => {
        this.taskData = this.dummyData;
      }
    );
    this.contributors = this.taskData.contributors;
    this.comments = this.taskData.comments as commentDTO[];
  }

  submit() {
    console.log('asd ');
  }

  createNewComment() {
    let newComment: commentDTO = {
      createdOn: new Date(),
      createdBy: getCurrentUserName(),
      text: this.text?.value,
    };
    this.taskService.createComment(newComment, this.taskID).subscribe(
      (resoult) => {
        this.comments.push(resoult);
      },
      (error: HttpErrorResponse) => {}
    );
  }

  createNewTaskList() {
    let newTaskList: taskListDTO = {
      name: this.taskListName?.value,
      items: [],
    };
    this.taskService.createTaskList(newTaskList, this.taskID).subscribe(
      (resoult) => {
        this.taskLists.push(resoult);
      },
      (error: HttpErrorResponse) => {}
    );
  }

  addContributor() {}
  removeContributorByID() {}

  deleteTask() {}

  createTaskList() {}
  removeTaskList() {}
  updateTaskListByID() {}

  removeComment() {}
  updateCommentByID() {}

  createTaskForm() {
    this.taskForm = this.formBuilder.group({
      taskNameCtrl: [this.data.taskName, Validators.required],
    });
  }

  get taskNameCtrl() {
    return this.taskForm.get('taskNameCtrl');
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  get text() {
    return this.commentForm.get('text');
  }

  createTaskListForm() {
    this.taskListForm = this.formBuilder.group({
      taskListName: ['', Validators.required],
    });
  }

  get taskListName() {
    return this.commentForm.get('taskListName');
  }
}
