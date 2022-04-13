import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { contributorsDTO } from 'src/app/DTOs/ContributorDTO';
import { environment } from 'src/environments/environment';
import { UserDTO, UserLoginDTO, UserUpdateDTO } from '../../DTOs/UserDTO';
import { JwtTokenService } from '../jwt-token-service/jwt-token.service';
import { HttpHeaders } from '@angular/common/http';
export interface AuthenticationResponse {
  userId: number;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUserSubject: BehaviorSubject<UserLoginDTO>;
  public currentUser: Observable<UserLoginDTO>;

  constructor(private http: HttpClient, private jwtService: JwtTokenService) {
    this.currentUserSubject = new BehaviorSubject<UserLoginDTO>(
      JSON.parse(localStorage.getItem('loggedInUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getAllEmails(projectID: number) {
    return this.http.get<string[]>(
      `${environment.apiUrl}/api/projects/${projectID}/emails`
    );
  }

  public get currentUserValue(): UserLoginDTO {
    return this.currentUserSubject.value;
  }

  createUser(user: UserDTO) {
    return this.http.post<UserDTO>(`${environment.apiUrl}/api/users`, user);
  }

  userLogin(user: UserLoginDTO) {
    let body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);

    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.http.post<UserLoginDTO>(
      `${environment.apiUrl}/api/users/login`,
      body,
      options
    );
  }

  userUpdate(user: UserUpdateDTO, userId: string) {
    return this.http.put<UserUpdateDTO>(
      `${environment.apiUrl}/api/user/update/${userId}`,
      user
    );
  }

  getAllContributors(projectID: number) {
    return this.http.get<contributorsDTO[]>(
      `${environment.apiUrl}/api/contributors/${projectID}`
    );
  }

  saveContributors(contributors: contributorsDTO[]) {
    return this.http.post<contributorsDTO[]>(
      `${environment.apiUrl}/api/users`,
      contributors
    );
  }
}
