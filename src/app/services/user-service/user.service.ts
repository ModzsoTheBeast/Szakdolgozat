import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  contributorsDTO,
  editContributorsRoleDTO,
} from 'src/app/DTOs/ContributorDTO';
import { environment } from 'src/environments/environment';
import {
  GetUserRoleInProjectDTO,
  UserDTO,
  UserIDDTO,
  UserLoginDTO,
  UserUpdateDTO,
} from '../../DTOs/UserDTO';
import { JwtTokenService } from '../jwt-token-service/jwt-token.service';
import { HttpHeaders } from '@angular/common/http';
import { roles } from 'src/app/models/enums/roleEnum';
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

  updateHeader$: Observable<string>;
  private updateHeaderSubject = new Subject<string>();

  setRole$: Observable<roles>;
  private setRoleSubject = new Subject<roles>();

  constructor(private http: HttpClient, private jwtService: JwtTokenService) {
    this.updateHeader$ = this.updateHeaderSubject.asObservable();
    this.setRole$ = this.setRoleSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject<UserLoginDTO>(
      JSON.parse(localStorage.getItem('loggedInUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  setRole(data: roles) {
    this.setRoleSubject.next(data);
  }

  updateHeader(data: string) {
    this.updateHeaderSubject.next(data);
  }

  getUserByName(username: string) {
    return this.http.get<UserIDDTO>(
      `${environment.apiUrl}/api/users/${username}`
    );
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
      observe: 'response' as 'response',
    };
    return this.http.post(
      `${environment.apiUrl}/api/users/login`,
      body,
      options
    );
  }

  userUpdate(user: UserUpdateDTO) {
    return this.http.post<UserUpdateDTO>(
      `${environment.apiUrl}/api/users/update`,
      user
    );
  }

  getAllContributors(projectID: number) {
    return this.http.get<contributorsDTO[]>(
      `${environment.apiUrl}/api/users/getusers/${projectID}`
    );
  }

  saveContributors(contributors: editContributorsRoleDTO) {
    return this.http.post<editContributorsRoleDTO>(
      `${environment.apiUrl}/api/role/updaterole`,
      contributors
    );
  }

  removeContributor(contributors: editContributorsRoleDTO) {
    return this.http.post<editContributorsRoleDTO>(
      `${environment.apiUrl}/api/role/delete`,
      contributors
    );
  }

  getUserRoleInProject(user: GetUserRoleInProjectDTO) {
    return this.http.post<GetUserRoleInProjectDTO>(
      `${environment.apiUrl}/api/role/get`,
      user
    );
  }
}
