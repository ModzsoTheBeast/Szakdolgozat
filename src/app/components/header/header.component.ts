import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ThemeService } from 'src/app/services/theme-service/theme-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  IsLogin: boolean = true;
  isDarkMode: boolean;
  BtnTxt: string;
  isLoggedIn: Boolean = false;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private sidenavService: SidenavService
  ) {
    this.router.navigate(['login']);
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  move() {
    this.IsLogin = !this.IsLogin;
    this.IsLogin
      ? this.router.navigate(['login'])
      : this.router.navigate(['register']);
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }

  toggleSidenav() {
    let i = 0;
    if (i === 1) {
      this.sidenavService._hide();
      i = 0;
    } else {
      this.sidenavService._show();
      i = 1;
    }
  }
}
