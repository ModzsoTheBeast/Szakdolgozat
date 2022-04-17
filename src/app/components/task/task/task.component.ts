import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  name: string;
  id: number;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.name = this.taskName;
    this.id = this.taskID;
    console.log(this.id);
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
