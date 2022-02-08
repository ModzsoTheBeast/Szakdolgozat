import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  userForm: FormGroup;
  asd = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get email() {
    return this.userForm.get('email');
  }

  get fullname() {
    return this.userForm.get('fullname');
  }

  onSubmit(): void {
    this.router.navigate(['login']);
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
  getEmailMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  getFullnameMessage() {
    return this.fullname?.hasError('required') ? 'Kötelező!' : '';
  }
}
