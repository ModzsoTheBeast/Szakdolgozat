import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { contributorsDTO } from 'src/app/DTOs/ContributorDTO';
import { environment } from 'src/environments/environment';
import { UserDTO, UserLoginDTO, UserUpdateDTO } from '../../DTOs/UserDTO';
import { JwtTokenService } from '../jwt-token-service/jwt-token.service';

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

  public get currentUserValue(): UserLoginDTO {
    return this.currentUserSubject.value;
  }

  createUser(user: UserDTO) {
    return this.http.post<UserDTO>(`${environment.apiUrl}/api/users`, user);
  }

  userLogin(user: UserLoginDTO) {
    return this.http
      .post<UserLoginDTO>(`${environment.apiUrl}/api/login`, user)
      .pipe(
        map((res) => {
          const userasd: UserLoginDTO = {
            id: res.id,
            userName: user.userName,
            password: user.password,
            token: res.token,
          };
          this.jwtService.saveJwtToken(res.token as string);
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
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
