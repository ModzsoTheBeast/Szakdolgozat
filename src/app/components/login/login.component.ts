import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  userForm: FormGroup;
  asd = false;

  constructor(private fb: FormBuilder, private router: Router) {
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
    this.router.navigate(['register']);
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
