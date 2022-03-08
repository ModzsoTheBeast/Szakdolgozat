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
import { UserService } from 'src/app/services/user.service';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private header: HeaderComponent,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
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
        user_name: this.username?.value,
        password: this.password?.value,
      })
      .subscribe(
        (next) => {
          this.router.navigate(['projects']);
          this.header.isLoggedIn = true;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.snackBar.open('Sikertelen bejelentkezés', '', {
            duration: this.durationInSeconds * 1000,
          });
          this.isLoading = false;
        },
        () => (this.isLoading = false)
      );
    this.header.isLoggedIn = true;
    this.router.navigate(['projects']); //ki kell majd ezt venni!
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
