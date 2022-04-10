import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private http: HttpClient) {}

  moveTaskDataBetweenTasks(
    moveTaskDataBetweenTasksData: MoveTaskDataBetweenTasksObj
  ) {
    return this.http.post<MoveTaskDataBetweenTasksObj>(
      `${environment.apiUrl}/api/task/moveBetweenLists`,
      moveTaskDataBetweenTasksData
    );
  }

  moveTask(moveTaskData: MoveTaskDataObj) {
    return this.http.post<MoveTaskDataObj>(
      `${environment.apiUrl}/api/task/moveInList`,
      moveTaskData
    );
  }
}

export class MoveTaskDataObj {
  listid: number;
  userid: number;
  projectid: number;
  fromPosition: number;
  toPosition: number;
}

export class MoveTaskDataBetweenTasksObj {
  fromlistposition: number;
  tolistposition: number;
  userid: number;
  projectid: number;
  fromPosition: number;
  toPosition: number;
}
