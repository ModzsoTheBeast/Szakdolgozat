import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDTO, UserLoginDTO, UserUpdateDTO } from '../../DTOs/UserDTO';

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

  userLogin(user: UserLoginDTO) {
    return this.http.get<UserLoginDTO>(`${environment.apiUrl}/api/user/login`);
  }

  userUpdate(user: UserUpdateDTO, userId: string) {
    return this.http.put<UserUpdateDTO>(
      `${environment.apiUrl}/api/user/update/${userId}`,
      user
    );
  }
}
