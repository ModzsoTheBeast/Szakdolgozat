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
  @Input()
  taskName: string;
  @Input()
  taskDesc: string;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  panelOpenState: boolean = false;

  openTaskDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['task-dialog'];
    if (window.innerWidth < 768) {
      dialogConfig.width = '80vw';
      dialogConfig.height = '80vh';
    } else {
      dialogConfig.width = '60vw';
      dialogConfig.height = '80vh';
    }
    this.dialog.open(TaskDialogComponent, dialogConfig);
  }
}
