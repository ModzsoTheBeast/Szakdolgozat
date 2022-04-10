import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { contributorsDTO } from 'src/app/DTOs/ContributorDTO';
import { roles } from 'src/app/models/enums/roleEnum';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-edit-contributor',
  templateUrl: './edit-contributor.component.html',
  styleUrls: ['./edit-contributor.component.scss'],
})
export class EditContributorComponent implements OnInit {
  isLoading = false;
  contr: contributorsDTO[] = [];
  editing: Boolean = false;
  rolesEnum: roles;
  roles: any[] = [
    'Projekt owner',
    'Scrum master',
    'Fejlesztő',
    'Teszter',
    'Support',
    'Egyéb',
  ];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllContributors(1).subscribe(
      (resoult: any) => {
        this.contr = resoult;
      },
      (error: HttpErrorResponse) => {
        this.contr.push(
          { name: 'asd', role: 'asddas' },
          { name: 'asd', role: 'asddas' },
          { name: 'asd', role: 'asddas' },
          { name: 'asd', role: 'asddas' }
        );
      }
    );
  }
  onSubmit() {
    this.isLoading = true;
    this.userService.saveContributors(this.contr).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    );
  }
}
