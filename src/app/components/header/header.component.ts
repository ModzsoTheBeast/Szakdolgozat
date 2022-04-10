import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HeaderServiceService } from 'src/app/services/header-service/header-service.service';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ThemeService } from 'src/app/services/theme-service/theme-service';
import { EditContributorComponent } from '../dialogs/edit-contributors-dialog/edit-contributor/edit-contributor.component';
import { UserUpdateDialogComponent } from '../dialogs/user-update-dialog/user-update-dialog/user-update-dialog.component';

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
  isLoggedInSrc: Subject<boolean>;
  loggedInUser: string;
  loggedInUserSrc: Subject<string>;
  onMainPage: Boolean = false;
  onMainPageSrc: Subject<boolean>;
  //= JSON.parse(localStorage.getItem('loggedInUser')!);
  constructor(
    private router: Router,
    private themeService: ThemeService,
    private sidenavService: SidenavService,
    private header: HeaderServiceService,
    public dialog: MatDialog
  ) {
    this.router.navigate(['login']);
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    this.isLoggedInSrc = this.header.isLoggedInSource;
    this.isLoggedInSrc.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.loggedInUserSrc = this.header.isLoggedInUserSource;
    this.loggedInUserSrc.subscribe((value) => {
      this.loggedInUser = value;
    });
    this.onMainPageSrc = this.header.onMainPageSource;
    this.onMainPageSrc.subscribe((value) => {
      this.onMainPage = value;
    });
  }

  moveToProject() {
    this.onMainPage = false;
    this.router.navigate(['projects']);
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

  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.loggedInUser = '';
  }

  openEditContributorsDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['task-dialog'];
    if (window.innerWidth < 768) {
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
    } else {
      dialogConfig.width = '40vw';
      dialogConfig.height = 'auto';
    }
    const dialogRef = this.dialog.open(EditContributorComponent, dialogConfig);
  }

  openProfileDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['userUpdate-dialog'];
    if (window.innerWidth < 768) {
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
    } else {
      dialogConfig.width = '40vw';
      dialogConfig.height = 'auto';
    }
    dialogConfig.data = {
      name: this.loggedInUser,
    };
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, dialogConfig);
  }
}
