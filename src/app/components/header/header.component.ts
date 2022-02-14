import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  IsLogin: boolean;
  isDarkMode: boolean;
  constructor() {}

  ngOnInit(): void {
    this.IsLogin = true;
    this.isDarkMode = false;
  }

  move() {
    this.IsLogin = !this.IsLogin;
  }
}
