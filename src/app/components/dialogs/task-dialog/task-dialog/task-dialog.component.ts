import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { commentDTO, createCommentDTO } from 'src/app/DTOs/CommentDTO';
import {
  addNewContrsDTO,
  contributorsDTO,
  removeUserFromTaskDTO,
} from 'src/app/DTOs/ContributorDTO';
import {
  addDeadlineDTO,
  setTaskPriorityDTO,
  taskDetailDTO,
  updateTaskDTO,
} from 'src/app/DTOs/TaskDTO';
import { createTaskListDTO, taskListDTO } from 'src/app/DTOs/TaskListDTO';
import { UserDTO, UserIDDTO, UserUpdateDTO } from 'src/app/DTOs/UserDTO';
import {
  getCurrentProjectID,
  getCurrentUserID,
  getCurrentUserName,
} from 'src/app/helpers/localStorage';
import { snack } from 'src/app/helpers/snack';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import {
  modifyTaskObj,
  TaskServiceService,
} from 'src/app/services/task-service/task-service.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user-service/user.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { priority } from 'src/app/models/enums/priorityEnum';
import { MoveService } from 'src/app/services/move-service/move.service';
import { idText } from 'typescript';
import {
  colorObj,
  ColorService,
} from 'src/app/services/color-service/color.service';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  commentForm: FormGroup;
  taskListForm: FormGroup;
  contributorsForm: FormGroup;
  taskData: taskDetailDTO;
  taskid: number;
  noMoreUser: boolean = false;
  nameEdit: Boolean = false;
  creatingTaskList: Boolean = false;
  creatingComment: Boolean = false;
  addContributors: Boolean = false;
  editingTask: Boolean = false;
  deadlineChange: Boolean = false;
  priorityChange: Boolean = false;
  allUsersInProject: contributorsDTO[];
  allUsers: contributorsDTO[];
  selectedUsers: contributorsDTO[];
  sULengthnumber: number;
  priority: priority;
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService,
    private snack: snack,
    private deleteService: DeleteService,
    private userService: UserService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private moveService: MoveService,
    private color: ColorService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { taskID: number }
  ) {
    this.deleteService.deleteTaskList$.subscribe((res) => {
      let index = this.taskData.taskLists.findIndex(
        (x) => x.taskListId === res
      );
      if (index != -1) this.taskData.taskLists.splice(index, 1);
    });

    this.deleteService.deleteComment$.subscribe((res) => {
      let index = this.taskData.comments?.findIndex((x) => x.commentId === res);
      if (index != -1) this.taskData.comments?.splice(index as number, 1);
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
    this.userService.getAllContributors(getCurrentProjectID()).subscribe(
      (res) => {
        this.allUsersInProject = res;
        this.allUsers = res;
        console.log(this.allUsers);
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('A tagok bet??lt??se sikertelen!', '', {
          duration: 2000,
        });
      }
    );
    this.taskService.getDetailedTaskDataByTaskID(this.taskid).subscribe(
      (resoult) => {
        this.taskData = resoult;
        this.taskData.contributors.forEach((p) => {
          let index = this.allUsersInProject.findIndex(
            (x) => x.userName == p.userName
          );
          console.log(index);
          if (index != -1) this.allUsersInProject.splice(index, 1);
        });
        if (this.allUsersInProject.length == 0) this.noMoreUser = true;
        console.log(resoult);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('Az adatok bet??lt??se sikertelen!', 'close', 2);
      }
    );

    this.createTaskForm();
    this.createContributorsForm();
    this.createCommentForm();
    this.createTaskListForm();
  }

  prioritySelected(value: any) {
    let data: setTaskPriorityDTO = {
      taskId: this.taskid,
      priority: value.value,
    };
    this.taskService.setTaskPriority(data).subscribe(
      (res) => {
        this.taskData.level = res.priority;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('A priorit??s ment??se sikertelen!', '', {
          duration: 2000,
        });
      }
    );
    this.priorityChange = false;
    let obj: colorObj = {
      color: value.value,
      id: this.taskid,
    };
    this.color.changeColor(obj);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let data: addDeadlineDTO = {
      deadline: event.value as Date,
      taskId: this.taskid,
    };
    if ((event.value as Date) == null) {
      this.deadlineChange = false;
      return;
    }
    this.taskService.addDeadline(data).subscribe(
      (res) => {
        this.taskData.deadline = res.deadline;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Hat??rid?? hozz??ad??sa sikertelen!', '', {
          duration: 2000,
        });
      }
    );
    this.deadlineChange = false;
  }

  editTask() {
    let update: updateTaskDTO = {
      taskId: this.taskid,
      taskName: this.taskName?.value,
      taskDescription: this.taskDescName?.value,
    };
    this.taskService.updateTask(update).subscribe(
      (res) => {
        if (res.taskName != null && res.taskName !== '')
          this.taskData.taskName = res.taskName as string;
        if (res.taskDescription != null && res.taskDescription !== '')
          this.taskData.taskDescription = res.taskDescription as string;
        let data: modifyTaskObj = {
          taskId: this.taskid,
          taskName: res.taskName as string,
          taskDescription: res.taskDescription as string,
        };
        this.taskService.modifyTask(data);
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('A task friss??t??se sikertelen!', '', {
          duration: 2000,
        });
      }
    );
    this.editingTask = false;
    this.taskForm.reset();
  }

  removeContributorFromTask(id: number) {
    let data: removeUserFromTaskDTO = {
      userId: id,
      taskId: this.taskid,
    };
    this.taskService.removeContributorFromTask(data).subscribe(
      (res) => {
        //let pID = getCurrentProjectID();
        // this.userService.getAllContributors(pID).subscribe((users) => {
        //   let index = users.findIndex((p) => p.userId == res.userId);
        //   let newUser: contributorsDTO = users[index];
        //   this.taskData.contributors.push(newUser);
        // });

        let index = this.taskData.contributors.findIndex(
          (x) => x.userId === res.userId
        );
        if (index != -1) this.taskData.contributors.splice(index, 1);
        this.noMoreUser = this.taskData.contributors.length == 0 ? false : true;
        let index1 = this.allUsers.findIndex((x) => x.userId == id);
        if (index1 != -1) {
          let user = this.allUsers[index1];
          this.allUsersInProject.push(user);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status == 200) {
          let index = this.taskData.contributors.findIndex(
            (x) => x.userId === id
          );
          if (index != -1) this.taskData.contributors.splice(index, 1);
          this.noMoreUser =
            this.taskData.contributors.length == 0 ? false : true;
          this.userService.getAllContributors(getCurrentProjectID()).subscribe(
            (res) => {
              let index1 = res.findIndex((x) => x.userId == id);
              if (index1 == -1) {
                let user = res[index1];
                this.allUsersInProject.push(user);
              }
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open('A tagok bet??lt??se sikertelen!', '', {
                duration: 2000,
              });
            }
          );
        }
      }
    );
  }

  drop(event: CdkDragDrop<contributorsDTO[]>) {
    moveItemInArray(
      this.taskData.contributors,
      event.previousIndex,
      event.currentIndex
    );
  }

  submit() {
    //this.taskService.updateTask()
  }

  createNewComment() {
    let newComment: createCommentDTO = {
      userId: getCurrentUserID(),
      comment: this.taskCommentName?.value,
      taskId: this.taskData.taskId as number,
    };
    this.taskService.createComment(newComment).subscribe(
      (resoult) => {
        let username = getCurrentUserName();
        let comment: commentDTO = {
          commentId: resoult.commentId as number,
          createdOn: resoult.createdOn as Date,
          createdBy: username,
          comment: resoult.comment,
        };
        this.taskData.comments?.push(comment);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('A komment l??trehoz??sa sikertelen!', 'close', 2);
      }
    );
    this.creatingComment = false;
    this.commentForm.reset();
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
        this.snack.response('A lista l??trehoz??sa sikertelen!', 'close', 2);
      }
    );
    this.taskListForm.reset();
  }

  addContributor() {
    let userids: number[] = [];
    this.selectedUsers.forEach((element) => {
      userids.push(element.userId);
    });
    console.log(userids);
    if (userids.length == 0) {
      return;
    }
    let users: addNewContrsDTO = {
      taskId: this.taskid,
      userId: userids,
    };
    this.taskService.addContributors(users).subscribe(
      (addedUser) => {
        this.userService.getAllContributors(getCurrentProjectID()).subscribe(
          (res) => {
            addedUser.userId.forEach((element) => {
              let index = res.findIndex((x) => x.userId == element);
              if (index != -1) {
                let user = res[index];
                this.taskData.contributors.push(user);
              }
            });
          },
          (error: HttpErrorResponse) => {
            this.snackBar.open('Tagok bet??lt??se sikertelen!', '', {
              duration: 2000,
            });
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Tag hozz??ad??sa sikertelen!', '', {
          duration: 2000,
        });
      }
    );
    this.noMoreUser = this.taskData.contributors.length == 0 ? true : false;
    this.addContributors = !this.addContributors;
  }

  deleteTask() {
    Swal.fire({
      title: 'Bitos vagy benne?',
      text: 'Nem fogod tudni vissza??ll??tani!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Igen, t??r??ld ki!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('T??r??lve!', '', 'success');
        this.taskService.deleteTask(this.taskid).subscribe(
          (res) => {},
          (error: HttpErrorResponse) => {
            this.snackBar.open('K??rtya t??rl??se sikertelen!', '', {
              duration: 2000,
            });
          },
          () => {}
        );
        this.deleteService.deleteTask(this.taskid);
        this.dialogRef.close();
      }
    });
  }

  createTaskForm() {
    this.taskForm = this.formBuilder.group({
      taskName: [this.taskData.taskName],
      taskDescName: [this.taskData.taskDescription],
    });
  }

  get taskName() {
    return this.taskForm.get('taskName');
  }

  get taskDescName() {
    return this.taskForm.get('taskDescName');
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      taskCommentName: ['', Validators.required],
    });
  }

  get taskCommentName() {
    return this.commentForm.get('taskCommentName');
  }

  createTaskListForm() {
    this.taskListForm = this.formBuilder.group({
      taskListName: ['', Validators.required],
    });
  }

  get taskListName() {
    return this.taskListForm.get('taskListName');
  }

  createContributorsForm() {
    this.contributorsForm = this.formBuilder.group({
      contributorsCtrl: ['', Validators.required],
    });
  }

  get contributorsCtrl() {
    return this.taskListForm.get('contributorsCtrl');
  }
}
