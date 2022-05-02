import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { priority } from 'src/app/models/enums/priorityEnum';
import {
  colorObj,
  ColorService,
} from 'src/app/services/color-service/color.service';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';
import { AddUserToProjectDialogComponent } from '../../dialogs/add-user-to-project-dialog/add-user-to-project-dialog/add-user-to-project-dialog.component';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog/task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() taskName: string;
  @Input() taskDesc: string;
  @Input() taskID: number;
  @Input() taskPriority: priority;

  desc: string;
  name: string;
  id: number;
  priority: priority;
  color: string = '';

  constructor(
    private dialog: MatDialog,
    private taskService: TaskServiceService,
    private colorService: ColorService
  ) {
    this.taskService.modifyTask$.subscribe((data) => {
      if (data.taskId == this.id) {
        if (data.taskName != null && data.taskName !== '')
          this.name = data.taskName;
        if (data.taskDescription != null && data.taskDescription !== '')
          this.desc = data.taskDescription;
      }
    });
  }

  ngOnInit(): void {
    this.name = this.taskName;
    this.id = this.taskID;
    this.desc = this.taskDesc;
    this.priority = this.taskPriority as priority;

    switch (String(this.priority)) {
      case 'MEDIUM':
        this.color = 'yellow';
        break;
      case 'BLOCKER':
        this.color = 'darkred';
        break;
      case 'TRIVIAL':
        break;
      case 'MINOR':
        this.color = 'green';
        break;
      case 'MAJOR':
        this.color = 'orange';
        break;
      case 'CRITICAL':
        this.color = 'red';
        break;
      default:
        break;
    }
    this.colorService.color$.subscribe((res) => {
      var element = document.getElementById(`${this.id}`) as HTMLElement;
      if (res.id == this.id) {
        switch (res.color) {
          case 'MEDIUM':
            this.color = 'yellow';
            element.style.backgroundColor = 'yellow';
            break;
          case 'BLOCKER':
            this.color = 'darkred';
            element.style.backgroundColor = 'darkred';
            break;
          case 'TRIVIAL':
            break;
          case 'MINOR':
            this.color = 'green';
            element.style.backgroundColor = 'green';
            break;
          case 'MAJOR':
            this.color = 'orange';
            element.style.backgroundColor = 'orange';
            break;
          case 'CRITICAL':
            this.color = 'red';
            element.style.backgroundColor = 'red';
            break;
          default:
            break;
        }
      }
    });
  }

  panelOpenState: boolean = false;
  contributors = [{ name: 'elso' }, { name: 'masodik' }];
  openTaskDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'task-dialog';
    if (window.innerWidth < 768) {
      dialogConfig.width = '80vw';
      dialogConfig.height = '85vh';
    } else {
      dialogConfig.width = '60vw';
      dialogConfig.height = '85vh';
    }
    dialogConfig.data = {
      taskID: this.id,
    };
    this.dialog.open(TaskDialogComponent, dialogConfig);
  }
}
