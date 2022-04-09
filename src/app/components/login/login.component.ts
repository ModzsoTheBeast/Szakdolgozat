import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HeaderServiceService } from 'src/app/services/header-service/header-service.service';
import { ThemeService } from 'src/app/services/theme-service/theme-service';
import { UserService } from 'src/app/services/user-service/user.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  providers: [HeaderComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  userForm: FormGroup;
  asd = false;
  durationInSeconds: number = 2;
  isLoading: boolean = false;
  //header------
  isLoggedIn: boolean = false;
  isLoggedInSrc: Subject<boolean>;
  //
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private header: HeaderServiceService,
    private theme: ThemeService
  ) {
    this.theme.update('dark-mode');
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.isLoggedInSrc = this.header.isLoggedInSource;
    // const isLoggedIn = this.header.getLoggedIn;
  }

  ngOnInit(): void {}

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  onSubmit(): void {
    this.isLoading = true;
    this.userService
      .userLogin({
        userName: this.username?.value,
        password: this.password?.value,
      })
      .subscribe(
        (next) => {
          this.header.changeIsLoggedIn((this.isLoggedIn = true));
          localStorage.clear();
          if (next.verified == true) {
            localStorage.setItem(
              'loggedInUser',
              JSON.stringify({ name: next.userName, id: next.id })
            );

            this.router.navigate(['projects']);
          } else {
            this.snackBar.open('Sikertelen bejelentkezés', '', {
              duration: this.durationInSeconds * 1000,
            });
          }
        },
        (err: HttpErrorResponse) => {
          localStorage.clear();
          console.log(err);
          this.header.changeIsLoggedInUser(this.username?.value);
          this.snackBar.open('Sikertelen bejelentkezés', '', {
            duration: this.durationInSeconds * 1000,
          });
          this.isLoading = false;
        },
        () => (this.isLoading = false)
      );
    this.router.navigate(['projects']); //ki kell majd ezt venni!
    this.header.changeIsLoggedIn((this.isLoggedIn = true));
  }

  getUsernameMessage() {
    return this.username?.hasError('required') ? 'Kötelező!' : '';
  }
  getErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Kötelező!';
    }
    return this.password?.hasError('minLength') ? (this.asd = true) : '';
  }
}
