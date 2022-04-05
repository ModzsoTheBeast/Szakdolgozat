import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsObj } from 'src/app/DTOs/ProjectsDTOs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  dummyProjects: ProjectsObj[] = [
    {
      projectName: 'teszt project1',
      listsData: [
        {
          listName: 'list 1',
          listTasksNumber: 5,
        },
        {
          listName: 'list 2',
          listTasksNumber: 2,
        },
        {
          listName: 'list 3',
          listTasksNumber: 1,
        },
        {
          listName: 'list 4',
          listTasksNumber: 7,
        },
        {
          listName: 'list 5',
          listTasksNumber: 12,
        },
      ],
    },
    {
      projectName: 'teszt project2',
      listsData: [
        {
          listName: 'list 1',
          listTasksNumber: 2,
        },
        {
          listName: 'list 2',
          listTasksNumber: 7,
        },
        {
          listName: 'list 3',
          listTasksNumber: 9,
        },
        {
          listName: 'list 4',
          listTasksNumber: 1,
        },
        {
          listName: 'list 5',
          listTasksNumber: 3,
        },
      ],
    },
    {
      projectName: 'teszt project3',
      listsData: [
        {
          listName: 'list 1',
          listTasksNumber: 3,
        },
        {
          listName: 'list 2',
          listTasksNumber: 3,
        },
        {
          listName: 'list 3',
          listTasksNumber: 8,
        },
        {
          listName: 'list 4',
          listTasksNumber: 3,
        },
        {
          listName: 'list 5',
          listTasksNumber: 5,
        },
      ],
    },
  ];
  projects: ProjectsObj[];

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
    this.projects = this.dummyProjects;
  }
}
