import { Injectable } from '@angular/core';
import { CreteListDTO, ListsDTO } from 'src/app/DTOs/ListDTOs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListServiceService {
  constructor(private http: HttpClient) {}

  createList(list: CreteListDTO) {
    return this.http.post<CreteListDTO>(
      `${environment.apiUrl}/api/list/create`,
      list
    );
  }

  getLists() {
    return this.http.get<ListsDTO>(`${environment.apiUrl}/api/getList`);
  }
}
