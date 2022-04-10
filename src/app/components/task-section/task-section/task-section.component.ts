import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  getCurrentProjectID,
  getCurrentUserID,
} from 'src/app/helpers/localStorage';
import {
  MoveTaskDataBetweenTasksObj,
  MoveTaskDataObj,
  TaskServiceService,
} from 'src/app/services/task-service/task-service.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskServiceService
  ) {
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
      taskPosition: this.tasks.length + 1,
      name: this.taskNameCtrl?.value.trim(),
      desc: '',
      done: false,
    };
    this.tasks.push(task);
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
        userid: getCurrentUserID(),
        projectid: getCurrentProjectID(),
        listid: listID,
        fromPosition: event.previousIndex,
        toPosition: event.currentIndex,
      };
      try {
        this.taskService.moveTask(obj1).subscribe();
      } catch (e) {
        console.log(e);
      }
      console.log(event);
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
        userid: getCurrentUserID(),
        projectid: getCurrentProjectID(),
        fromPosition: event.previousIndex,
        toPosition: event.currentIndex,
        fromlistposition: fromListPosition,
        tolistposition: toListPosition,
      };
      try {
        this.taskService.moveTaskDataBetweenTasks(obj).subscribe();
      } catch (e) {
        console.log(e);
      }
      console.log(event);
    }
  }
}
