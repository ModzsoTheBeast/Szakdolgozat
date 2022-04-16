import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateProjectDTO, ProjectsObj } from 'src/app/DTOs/ProjectsDTOs';
import { getCurrentUserID } from 'src/app/helpers/localStorage';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { CreateProjectDialogComponent } from '../dialogs/create-project-dialog/create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  // dummyProjects: ProjectsObj[] = [
  //   {
  //     projectID: 1,
  //     projectName: 'teszt project1',
  //     listsData: [
  //       {
  //         listName: 'list 1',
  //         listTasksNumber: 0,
  //       },
  //       {
  //         listName: 'list 2',
  //         listTasksNumber: 0,
  //       },
  //       {
  //         listName: 'list 3',
  //         listTasksNumber: 1,
  //       },
  //       {
  //         listName: 'list 4',
  //         listTasksNumber: 7,
  //       },
  //       {
  //         listName: 'list 5',
  //         listTasksNumber: 12,
  //       },
  //     ],
  //   },
  //   {
  //     projectID: 2,
  //     projectName: 'teszt project2',
  //     listsData: [
  //       {
  //         listName: 'list 1',
  //         listTasksNumber: 2,
  //       },
  //       {
  //         listName: 'list 2',
  //         listTasksNumber: 7,
  //       },
  //       {
  //         listName: 'list 3',
  //         listTasksNumber: 9,
  //       },
  //       {
  //         listName: 'list 4',
  //         listTasksNumber: 1,
  //       },
  //       {
  //         listName: 'list 5',
  //         listTasksNumber: 3,
  //       },
  //     ],
  //   },
  //   {
  //     projectId: 3,
  //     projectName: 'teszt project3',
  //     lists: [
  //       {
  //         listName: 'list 1',
  //         listTasksNumber: 3,
  //       },
  //       {
  //         listName: 'list 2',
  //         listTasksNumber: 3,
  //       },
  //       {
  //         listName: 'list 3',
  //         listTasksNumber: 8,
  //       },
  //       {
  //         listName: 'list 4',
  //         listTasksNumber: 3,
  //       },
  //       {
  //         listName: 'list 5',
  //         listTasksNumber: 5,
  //       },
  //     ],
  //   },
  // ];
  projects: ProjectsObj[];
  user: number;
  lengthIsOne: Boolean = false;
  loading: Boolean = false;
  maxProjectNumber: Boolean = false;
  plength: number = 0;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.projectService.myMethod$.subscribe((data) => {
      var projectData: CreateProjectDTO = {
        userId: this.user,
        projectName: data,
      };
      this.projectService.createProjects(projectData).subscribe(
        (res) => {
          var asd: ProjectsObj = {
            projectId: res.projectId ? res.projectId : 0,
            projectName: res.projectName,
            lists: [],
          };
          this.projects.push(asd);
          this.lengthIsOne = this.projects.length == 1 ? true : false;
          this.plength = this.projects.length;
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open('Nem sikerült létrehozni a projektet!', '', {
            duration: 2,
          });
        }
      );
    });
  }
  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.projects = [];
      this.user = getCurrentUserID();
      this.projectService.getAllProjectsByID(this.user).subscribe(
        (res) => {
          this.projects = res;
          this.plength = res.length;
          this.lengthIsOne = res.length == 1 ? true : false;
          if (res.length >= 10) this.maxProjectNumber = true;
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          //this.projects = this.dummyProjects;
          this.lengthIsOne = this.projects.length == 1 ? true : false;
          this.snackBar.open('Hiba a projektek betöltése közben!', '', {
            duration: 2,
          });
          this.loading = false;
        }
      );
    }, 1000);
  }

  createProject(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['project-dialog'];
    if (window.innerWidth < 768) {
      dialogConfig.width = 'auto';
      dialogConfig.height = 'auto';
    } else {
      dialogConfig.width = '40vw';
      dialogConfig.height = 'auto';
    }
    dialogConfig.data = {
      //title: this.title,
    };
    const dialogRef = this.dialog.open(
      CreateProjectDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      this.projectService.getAllProjectsByID(this.user).subscribe((res) => {
        this.projects = res;
        this.lengthIsOne = res.length == 1 ? true : false;
        this.loading = false;
      });
    });
  }
}
