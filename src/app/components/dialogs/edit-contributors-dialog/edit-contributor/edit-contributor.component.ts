import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-edit-contributor',
  templateUrl: './edit-contributor.component.html',
  styleUrls: ['./edit-contributor.component.scss'],
})
export class EditContributorComponent implements OnInit {
  isLoading = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  onSubmit() {
    this.isLoading = true;
    this.userService.saveContributors().subscribe(
      (res) => {
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    );
  }
}
