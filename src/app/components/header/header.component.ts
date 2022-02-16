import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  IsLogin: boolean;
  isDarkMode: boolean;
  BtnTxt: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.IsLogin = true;
    this.isDarkMode = false;
    this.BtnTxt = 'Regisztráció!';
  }

  move() {
    this.IsLogin = !this.IsLogin;
    if (this.IsLogin) {
      this.BtnTxt = 'Regisztráció';
      this.router.navigate(['register']);
    } else {
      this.BtnTxt = 'Bejelentkezés';
      this.router.navigate(['login']);
    }
  }
}
