import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  deleteProject$: Observable<number>;
  private deleteProjectSubject = new Subject<number>();

  deleteTaskList$: Observable<number>;
  private deleteTaskListSubject = new Subject<number>();

  deleteComment$: Observable<number>;
  private deleteCommentSubject = new Subject<number>();

  deleteTask$: Observable<number>;
  private deleteTaskSubject = new Subject<number>();

  deleteList$: Observable<number>;
  private deleteListSubject = new Subject<number>();

  constructor() {
    this.deleteProject$ = this.deleteProjectSubject.asObservable();
    this.deleteTaskList$ = this.deleteTaskListSubject.asObservable();
    this.deleteComment$ = this.deleteCommentSubject.asObservable();
    this.deleteTask$ = this.deleteTaskSubject.asObservable();
    this.deleteList$ = this.deleteListSubject.asObservable();
  }

  deleteList(data: number) {
    this.deleteListSubject.next(data);
  }

  deleteProject(data: number) {
    this.deleteProjectSubject.next(data);
  }

  deleteTaskList(taskListId: number) {
    this.deleteTaskListSubject.next(taskListId);
  }

  deleteComment(taskCommentId: number) {
    this.deleteCommentSubject.next(taskCommentId);
  }

  deleteTask(taskId: number) {
    this.deleteTaskSubject.next(taskId);
  }
}
