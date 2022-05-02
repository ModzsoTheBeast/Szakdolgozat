import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListDTO, MoveDTO } from 'src/app/DTOs/ListDTOs';
import {
  getCurrentProjectID,
  getCurrentUserID,
} from 'src/app/helpers/localStorage';
import { snack } from 'src/app/helpers/snack';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { ListServiceService } from 'src/app/services/list-service/list-service.service';
import { MoveService } from 'src/app/services/move-service/move.service';
import {
  MoveTaskDataBetweenTasksObj,
  MoveTaskDataObj,
  TaskServiceService,
} from 'src/app/services/task-service/task-service.service';
import Swal from 'sweetalert2';
import { createTaskDTO, taskDTO } from '../../../DTOs/TaskDTO';
@Component({
  selector: 'app-task-section',
  templateUrl: './task-section.component.html',
  styleUrls: ['./task-section.component.scss'],
})
export class TaskSectionComponent implements OnInit {
  @Input() listID: number;
  @Input() title: string;
  @Input() _tasks: taskDTO[];
  @Input() listsLength: number;
  @Input() listPosition: number;

  createTaskForm: FormGroup;
  tasks: any[];
  createTaskBool: boolean = false;
  listid: number;
  lists: any[];
  isListFirst: Boolean;
  isListLast: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService,
    private listService: ListServiceService,
    private snack: snack,
    private moveService: MoveService,
    private deleteService: DeleteService,
    private snackBar: MatSnackBar
  ) {
    this.createListForm();
  }

  ngOnInit() {
    this.deleteService.deleteTask$.subscribe((id) => {
      let index = this._tasks.findIndex((task) => task.taskId == id);
      if (index != -1) {
        this._tasks.splice(index, 1);
      }
      this.tasks = this._tasks;
    });
    this.tasks = this._tasks;
    this.listid = this.listID;
    this.isListLast = this.listPosition == this.listsLength - 1 ? true : false;
    this.isListFirst = this.listPosition == 0 ? true : false;
  }

  ngOnDestroy() {
    this.tasks = [];
  }

  deleteList() {
    Swal.fire({
      title: 'Bitos vagy benne?',
      text: 'Nem fogod tudni visszaállítani!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Igen, töröld ki!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Törölve!', '', 'success');
        this.listService.deleteList(this.listID).subscribe(
          (res) => {},
          (error: HttpErrorResponse) => {
            this.snackBar.open('A lista törlése sikertelen!', '', {
              duration: 2,
            });
          },
          () => {}
        );
        this.deleteService.deleteList(this.listID);
        this.isListLast =
          this.listPosition == this.listsLength - 1 ? true : false;
        this.isListFirst = this.listPosition == 0 ? true : false;
      }
    });
  }

  moveListToLeft() {
    let position: MoveDTO = {
      listPosition: this.listPosition,
      projectId: getCurrentProjectID(),
    };
    if (this.listPosition == 0 || this.listPosition == undefined) {
      return;
    }
    this.listService.moveListToLeft(position).subscribe(
      (res) => {
        this.moveService.moveList(true);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('Lista mozgatása sikertelen volt :/', undefined, 1);
      }
    );
  }

  moveListToRight() {
    if (
      this.listPosition == this.listsLength - 1 ||
      this.listPosition == undefined
    ) {
      return;
    }
    let position: MoveDTO = {
      listPosition: this.listPosition,
      projectId: getCurrentProjectID(),
    };
    this.listService.moveListToRight(position).subscribe(
      (res) => {
        this.moveService.moveList(true);
      },
      (error: HttpErrorResponse) => {
        this.snack.response('Lista mozgatása sikertelen volt :/', undefined, 1);
      }
    );
  }

  createTaskAction() {
    var task: createTaskDTO = {
      positionInList: this.tasks.length,
      taskName: this.taskNameCtrl?.value.trim(),
      listId: this.listid,
    };
    this.taskService.createNewTask(task).subscribe(
      (res) => {
        this.tasks.push(res);
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Kártya létréhozása sikertelen!', '', {
          duration: 2,
        });
      }
    );
    this.createTaskBool = false;
    this.createTaskForm.reset();
  }

  createTask() {
    this.createTaskBool = true;
  }

  createListForm() {
    this.createTaskForm = this.formBuilder.group({
      taskNameCtrl: ['', Validators.required],
    });
  }

  get taskNameCtrl() {
    return this.createTaskForm.get('taskNameCtrl');
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var listID = Number(event.container.id.substring(14));
      var obj1: MoveTaskDataObj = {
        listId: this.listid,
        startPosition: event.previousIndex,
        endPosition: event.currentIndex,
      };
      try {
        this.taskService.moveTask(obj1).subscribe();
      } catch (e) {
        console.log(e);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      var toListPosition = Number(event.container.id.substring(14));
      var fromListPosition = Number(event.previousContainer.id.substring(14));
      var obj: MoveTaskDataBetweenTasksObj = {
        startTaskPosition: event.previousIndex,
        endTaskPosition: event.currentIndex,
        startListId: event.previousContainer.autoScrollStep as number,
        endListId: event.container.autoScrollStep as number,
        startListLength: event.previousContainer.data.length,
        endListLength: event.container.data.length,
      };
      try {
        this.taskService.moveTaskDataBetweenTasks(obj).subscribe();
      } catch (e) {
        console.log(e);
      }
    }
  }
}
