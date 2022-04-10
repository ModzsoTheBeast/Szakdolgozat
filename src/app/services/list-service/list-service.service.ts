import { Injectable } from '@angular/core';
import { CreteListObj, ListDTO } from 'src/app/DTOs/ListDTOs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListServiceService {
  constructor(private http: HttpClient) {}

  createList(list: CreteListObj) {
    return this.http.post<CreteListObj>(
      `${environment.apiUrl}/api/list/create`,
      list
    );
  }

  getLists(projectID: number) {
    return this.http.get<ListDTO[]>(
      `${environment.apiUrl}/api/lists/${projectID}`
    );
  }

  moveList(moveListData: MoveListDataObj) {
    return this.http.post<MoveListDataObj>(
      `${environment.apiUrl}/api/list/create`,
      moveListData
    );
  }
}

export class MoveListDataObj {
  userid: number;
  projectid: number;
  fromPosition: number;
  toPosition: number;
}
