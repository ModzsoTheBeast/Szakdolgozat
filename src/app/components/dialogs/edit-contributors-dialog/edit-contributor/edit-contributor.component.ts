import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  contributorsDTO,
  editContributorsRoleDTO,
} from 'src/app/DTOs/ContributorDTO';
import {
  getCurrentProjectID,
  getCurrentUserID,
} from 'src/app/helpers/localStorage';
import { roles } from 'src/app/models/enums/roleEnum';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { UserService } from 'src/app/services/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contributor',
  templateUrl: './edit-contributor.component.html',
  styleUrls: ['./edit-contributor.component.scss'],
})
export class EditContributorComponent implements OnInit {
  isLoading = false;
  contr: contributorsDTO[] = [];
  editing: Boolean = false;
  rolesEnum = roles;
  enumKeys: string[] = [];

  selectedValue: any;
  //invite
  myControl = new FormControl();
  emailOptions: string[] = ['lokospatrik8@gmail.com'];
  filteredOptions: Observable<string[]>;
  toEmail: string = `https://formsubmit.co/${this.myControl.value}`;
  //
  number = 0;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<EditContributorComponent>,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {
    this.enumKeys = Object.keys(this.rolesEnum);
    this.enumKeys.splice(0, 6);
  }

  ngOnInit(): void {
    let id = getCurrentProjectID();

    // this.userService.getAllEmails(id).subscribe((res: string[]) => {
    //   this.emailOptions = res;
    // });
    this.userService.getAllContributors(id).subscribe(
      (resoult: any) => {
        this.contr = resoult;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('A tagok bet??lt??se sikertelen!', '', {
          duration: 2000,
        });
      }
    );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.emailOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  valueChanged(event: any, con: contributorsDTO) {
    let pID = getCurrentProjectID();
    let userData: editContributorsRoleDTO = {
      userId: con.userId,
      projectId: pID,
      role: event,
    };
    this.userService.saveContributors(userData).subscribe(
      (res: any) => {},
      (error: HttpErrorResponse) => {
        this.snackBar.open('A ment??s sikertelen!!', '', {
          duration: 2000,
        });
      }
    );
    if (con.userId == getCurrentUserID()) {
      localStorage.setItem('userRole', event);
    }
  }

  removeFromProject(con: contributorsDTO) {
    let asd1 = con;
    let pID = getCurrentProjectID();
    let userData: editContributorsRoleDTO = {
      userId: con.userId,
      projectId: pID,
      role: this.selectedValue,
    };
    this.userService.getAllContributors(pID).subscribe(
      (resoult: any) => {
        this.contr = resoult;
        const indexOfS = Object.values(roles).indexOf(0 as unknown as roles);
        const key = Object.keys(roles)[indexOfS];
        this.contr.forEach((element) => {
          if (element.role == key) {
            this.number++;
          }
        });
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('A tagok bet??lt??se sikertelen!', '', {
          duration: 2000,
        });
      }
    );

    Swal.fire({
      title: 'Bitos vagy benne?',
      text: 'Nem fogod tudni vissza??ll??tani!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Igen, t??r??ld ki!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.contr.length == 1) {
          Swal.fire('T??r??lve!', '', 'success').then(() => {
            this.projectService.deleteProject(pID).subscribe(
              (res) => {},
              (error: HttpErrorResponse) => {
                this.snackBar.open('A projekt t??rl??se sikertelen!', '', {
                  duration: 2000,
                });
              }
            );
            if (con.userId == getCurrentUserID()) {
              this.dialogRef.close();
              this.router.navigate(['projects']);
            }
          });
        } else if (this.contr.length > 1 && this.number <= 1) {
          Swal.fire(
            'Legal??bb egy PRODUCT_OWNER-nek kell lennie!',
            '',
            'warning'
          );
        } else {
          this.userService.removeContributor(userData).subscribe(
            (res: any) => {
              let index = this.contr.findIndex((x) => x.userId == con.userId);
              this.contr = this.contr.splice(index, 1);
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open('Az elt??vol??t??s sikertelen!', '', {
                duration: 2000,
              });
            }
          );
          this.dialogRef.close();
          if (getCurrentUserID() == con.userId) {
            this.router.navigate(['login']);
          }
        }
      }
    });
  }
}
