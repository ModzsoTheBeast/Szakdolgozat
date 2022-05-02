import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private projectService: ProjectService
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
      (error: HttpErrorResponse) => {}
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
      (error: HttpErrorResponse) => {}
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
      (error: HttpErrorResponse) => {}
    );

    Swal.fire({
      title: 'Bitos vagy benne?',
      text: 'Nem fogod tudni visszaállítani!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Igen, töröld ki!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.contr.length == 1) {
          Swal.fire('Törölve!', '', 'success').then(() => {
            this.projectService.deleteProject(pID).subscribe((res) => {});
            if (con.userId == getCurrentUserID()) {
              this.dialogRef.close();
              this.router.navigate(['projects']);
            }
          });
        } else if (this.contr.length > 1 && this.number <= 1) {
          Swal.fire(
            'Legalább egy PRODUCT_OWNER-nek kell lennie!',
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
              this.isLoading = false;
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
