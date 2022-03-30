import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CreateListService } from 'src/app/services/create-list/create-list.service';
import Swal from 'sweetalert2';
import { CreateListDialogComponent } from '../../dialogs/create-list-dialog/create-list-dialog/create-list-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  //dragscroll
  mouseDown = false;
  startX: any;
  scrollLeft: any;
  slider = document.querySelector<HTMLElement>('.parent');
  //variables for data
  lists: any[];
  title: string;
  listName: string = '';
  listNameSrc: Subject<string>;
  constructor(
    public dialog: MatDialog,
    private listService: CreateListService
  ) {
    this.lists = [];
    /*TODO: getAllLists().subscribe(res => {
      this.lists = [{id: res.id, title: res.title}];
    })*/
    this.listService.myMethod$.subscribe((data) => {
      this.title = data;
      this.lists.push({ title: this.title });
      //TODO: setList();
    });
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
    console.log(e);
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
