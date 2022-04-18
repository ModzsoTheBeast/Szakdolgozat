import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { commentDTO } from 'src/app/DTOs/CommentDTO';
import { contributorsDTO } from 'src/app/DTOs/ContributorDTO';
import { taskDetailDTO } from 'src/app/DTOs/TaskDTO';
import { createTaskListDTO, taskListDTO } from 'src/app/DTOs/TaskListDTO';
import {
  getCurrentUserID,
  getCurrentUserName,
} from 'src/app/helpers/localStorage';
import { snack } from 'src/app/helpers/snack';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  commentForm: FormGroup;
  taskListForm: FormGroup;
  taskData: taskDetailDTO;
  taskid: number;
  nameEdit: Boolean = false;
  creatingTaskList: Boolean = false;
  creatingComment: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService,
    private snack: snack,
    private deleteService: DeleteService,
    @Inject(MAT_DIALOG_DATA) public data: { taskID: number }
  ) {
    this.deleteService.deleteTaskList$.subscribe((res) => {
      let index = this.taskData.taskLists.findIndex(
        (x) => x.taskListId === res
      );
      if (index != -1) this.taskData.taskLists.splice(index, 1);
    });
  }

  ngOnInit(): void {
    this.taskData = {
      taskName: '',
      isDone: true,
      contributors: [],
      createdOn: new Date(),
      taskLists: [],
      comments: [],
    };
    this.taskid = this.data.taskID;
    console.log(this.taskid);

    this.createTaskForm();
    this.createCommentForm();
    this.createTaskListForm();
    this.taskService.getDetailedTaskDataByTaskID(this.taskid).subscribe(
      (resoult) => {
        this.taskData = resoult;
        console.log(resoult);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('Az adatok betöltése sikertelen!', 'close', 2);
      }
    );
  }

  submit() {
    //this.taskService.updateTask()
  }

  createNewComment() {
    let newComment: commentDTO = {
      createdOn: new Date(),
      createdBy: getCurrentUserName(),
      text: this.text?.value,
    };
    this.taskService.createComment(newComment, this.taskid).subscribe(
      (resoult) => {
        this.taskData.comments?.push(resoult);
      },
      (error: HttpErrorResponse) => {}
    );
  }

  createNewTaskList() {
    let newTaskList: createTaskListDTO = {
      taskId: this.taskid,
      taskListName: this.taskListName?.value,
    };
    this.taskService.createTaskList(newTaskList).subscribe(
      (resoult) => {
        let newList: taskListDTO = {
          taskListId: resoult.taskListId,
          taskListName: resoult.taskListName,
          taskListItems: [],
        };
        this.taskData.taskLists.push(newList);
        this.creatingTaskList = false;
      },
      (error: HttpErrorResponse) => {
        this.snack.response('A lista létrehozása sikertelen!', 'close', 2);
      }
    );
  }

  addContributor() {}
  removeContributorByID() {}

  deleteTask() {}

  removeTaskList() {}
  updateTaskListByID() {}

  createTaskForm() {
    this.taskForm = this.formBuilder.group({
      taskNameCtrl: ['', Validators.required],
      taskDescCtrl: ['', Validators.required],
      lol: ['', Validators.required],
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
    return this.taskListForm.get('taskListName');
  }
}
