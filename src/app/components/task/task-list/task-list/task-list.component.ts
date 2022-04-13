import { Component, Input, OnInit } from '@angular/core';
import { taskListDTO, taskListItemDTO } from 'src/app/DTOs/TaskListDTO';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() _data: taskListDTO;
  listData: taskListDTO;
  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.listData = this._data;
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.listData.items != null && this.listData.items.every((t) => t.isDone);
    this.taskService.updateTaskListByID(
      this.listData.id as number,
      this.listData
    );
  }

  someComplete(): boolean {
    if (this.listData.items == null) {
      return false;
    }
    this.listData.items.filter((t) => t.isDone);
    this.taskService.updateTaskListByID(
      this.listData.id as number,
      this.listData
    );
    return (
      this.listData.items.filter((t) => t.isDone).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listData.items == null) {
      return;
    }
    this.listData.items.forEach((t) => (t.isDone = completed));
    this.taskService.updateTaskListByID(
      this.listData.id as number,
      this.listData
    );
  }

  createNewItem() {
    let newItem: taskListItemDTO = {
      name: '',
      isDone: false,
    };
    this.taskService.updateTaskListByID(
      this.listData.id as number,
      this.listData
    );
  }
}
