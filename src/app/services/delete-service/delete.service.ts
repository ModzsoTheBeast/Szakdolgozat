import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  deleteProject$: Observable<boolean>;
  private deleteProjectSubject = new Subject<boolean>();

  deleteTaskList$: Observable<number>;
  private deleteTaskListSubject = new Subject<number>();

  constructor() {
    this.deleteProject$ = this.deleteProjectSubject.asObservable();
    this.deleteTaskList$ = this.deleteTaskListSubject.asObservable();
  }

  deleteProject(data: boolean) {
    console.log(data);
    this.deleteProjectSubject.next(data);
  }

  deleteTaskList(taskListId: number) {
    this.deleteTaskListSubject.next(taskListId);
  }
}
