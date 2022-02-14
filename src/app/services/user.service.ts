import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../DTOs/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: UserDTO) {
    return this.http.post<UserDTO>(
      `${environment.apiUrl}/api/user/register`,
      user
    );
  }
}
