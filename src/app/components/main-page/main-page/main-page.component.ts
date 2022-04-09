import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ListDTO } from 'src/app/DTOs/ListDTOs';
import { CreateListService } from 'src/app/services/create-list/create-list.service';
import Swal from 'sweetalert2';
import { CreateListDialogComponent } from '../../dialogs/create-list-dialog/create-list-dialog/create-list-dialog.component';
import { ListServiceService } from '../../../services/list-service/list-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  //dragscroll
  mouseDown = false;
  startX: any;
  scrollLeft: any;
  slider = document.querySelector<HTMLElement>('.parent');
  //variables for data
  title: string;
  listName: string = '';
  listNameSrc: Subject<string>;
  loading: Boolean;
  listsLength: Boolean = false;
  dumyData: ListDTO[] = [
    {
      id: 1,
      listName: 'list1',
      tasks: [
        {
          id: 1,
          name: 'name11',
          desc: 'desc11',
          done: false,
        },
        {
          id: 2,
          name: 'name21',
          desc: 'desc21',
          done: false,
        },
        {
          id: 3,
          name: 'name31',
          desc: 'desc31',
          done: false,
        },
      ],
    },
    {
      id: 2,
      listName: 'list2',
      tasks: [
        {
          id: 1,
          name: 'name12',
          desc: 'desc12',
          done: false,
        },
        {
          id: 2,
          name: 'name21',
          desc: 'desc21',
          done: false,
        },
        {
          id: 3,
          name: 'name31',
          desc: 'desc31',
          done: false,
        },
      ],
    },
    {
      id: 3,
      listName: 'list3',
      tasks: [
        {
          id: 1,
          name: 'name13',
          desc: 'desc13',
          done: false,
        },
        {
          id: 2,
          name: 'name21',
          desc: 'desc21',
          done: false,
        },
        {
          id: 3,
          name: 'name31',
          desc: 'desc31',
          done: false,
        },
      ],
    },
    {
      id: 4,
      listName: 'list4',
      tasks: [],
    },
  ];

  lists: any[];
  constructor(
    public dialog: MatDialog,
    private listservice: ListServiceService,
    private createListService: CreateListService,
    private snackBar: MatSnackBar
  ) {
    /*TODO: getAllLists().subscribe(res => {
      this.lists = [{id: res.id, title: res.title}];
    })*/

    this.createListService.myMethod$.subscribe((data) => {
      this.title = data;
      var lista: ListDTO = {
        listName: this.title,
        tasks: [],
      };
      this.lists.push(lista);
      this.listsLength = true;
      //TODO: setList();
    });
  }

  ngOnInit() {
    this.loading = true;
    this.listservice.getLists(1).subscribe(
      (res) => {
        this.lists = res;
        this.loading = false;
        this.listsLength = true;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('A listák betöltése nem sikerült!', '', {
          duration: 2000,
        });
        this.loading = false;
      }
    );
  }
  async createListDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
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
    dialogConfig.data = {
      title: this.title,
    };
    const dialogRef = this.dialog.open(CreateListDialogComponent, dialogConfig);
  }

  startDragging(
    e: { pageX: number },
    flag: any,
    el: { offsetLeft: number; scrollLeft: any }
  ) {
    setTimeout;
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }
  stopDragging(e: any, flag: any) {
    this.mouseDown = false;
  }
  moveEvent(
    e: { preventDefault: () => void; pageX: number },
    el: { offsetLeft: number; scrollLeft: number }
  ) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }
}
