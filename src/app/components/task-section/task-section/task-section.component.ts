import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { taskDTO } from '../../../DTOs/TaskDTO';
@Component({
  selector: 'app-task-section',
  templateUrl: './task-section.component.html',
  styleUrls: ['./task-section.component.scss'],
})
export class TaskSectionComponent implements OnInit {
  @Input() title: string;
  @Input() _tasks: taskDTO[];

  createTaskForm: FormGroup;
  tasks: any[];
  createTaskBool: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.createListForm();
    //TODO:getTasksByListId();
  }
  ngOnInit() {
    this.tasks = this._tasks;
    console.log(this.title);
    console.log(this._tasks);
  }

  createTaskAction() {
    var task: taskDTO = {
      name: this.taskNameCtrl?.value.trim(),
      desc: '',
      done: false,
    };
    this.tasks.push(task);
    this.createTaskBool = false;
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
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
