import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CreateProjectDTO, ProjectsObj } from 'src/app/DTOs/ProjectsDTOs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  myMethod$: Observable<string>;
  private myMethodSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  getAllProjectsByID(userID: number) {
    return this.http.get<ProjectsObj[]>(
      `${environment.apiUrl}/api/projects/${userID}`
    );
  }

  createProjects(project: CreateProjectDTO) {
    return this.http.post<CreateProjectDTO>(
      `${environment.apiUrl}/api/projects`,
      project
    );
  }

  myMethod(data: string) {
    console.log(data);
    this.myMethodSubject.next(data);
  }
}
