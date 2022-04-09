import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createTaskForm();
  }

  submit() {
    console.log('asd ');
  }

  createTaskForm() {
    this.taskForm = this.formBuilder.group({
      taskNameCtrl: [this.data.taskName, Validators.required],
    });
  }

  get taskNameCtrl() {
    return this.taskForm.get('taskNameCtrl');
  }
}
