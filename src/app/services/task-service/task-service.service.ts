import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commentDTO } from 'src/app/DTOs/CommentDTO';
import { contributorsDTO } from 'src/app/DTOs/ContributorDTO';
import { createTaskDTO, taskDetailDTO, taskDTO } from 'src/app/DTOs/TaskDTO';
import { taskListDTO, taskListItemDTO } from 'src/app/DTOs/TaskListDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private http: HttpClient) {}

  createTaskList(taskList: taskListDTO, taskID: number) {
    return this.http.post<taskListDTO>(
      `${environment.apiUrl}/api/task/taskList/${taskID}`,
      taskList
    );
  }

  createNewTask(task: createTaskDTO) {
    return this.http.post<createTaskDTO>(
      `${environment.apiUrl}/api/task`,
      task
    );
  }

  createComment(comment: commentDTO, taskID: number) {
    return this.http.post<commentDTO>(
      `${environment.apiUrl}/api/task/comment/${taskID}`,
      comment
    );
  }

  getDetailedTaskDataByTaskID(taskID: number) {
    return this.http.get<taskDetailDTO>(
      `${environment.apiUrl}/api/task/${taskID}`
    );
  }

  moveTaskDataBetweenTasks(
    moveTaskDataBetweenTasksData: MoveTaskDataBetweenTasksObj
  ) {
    return this.http.post<MoveTaskDataBetweenTasksObj>(
      `${environment.apiUrl}/api/task/movetaskbetweenlists`,
      moveTaskDataBetweenTasksData
    );
  }

  moveTask(moveTaskData: MoveTaskDataObj) {
    return this.http.post<MoveTaskDataObj>(
      `${environment.apiUrl}/api/task/movetaskinlist`,
      moveTaskData
    );
  }

  updateTaskListByID(taskListID: number, taskListItems: taskListDTO) {
    return this.http.post<taskListDTO>(
      `${environment.apiUrl}/api/task/taskList/update/${taskListID}`,
      taskListItems
    );
  }
}

export class MoveTaskDataObj {
  listId: number;
  startPosition: number;
  endPosition: number;
}

export class MoveTaskDataBetweenTasksObj {
  startListId: number;
  endListId: number;
  startTaskPosition: number;
  endTaskPosition: number;
  startListLength: number;
  endListLength: number;
}
