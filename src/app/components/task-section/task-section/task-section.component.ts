import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-section',
  templateUrl: './task-section.component.html',
  styleUrls: ['./task-section.component.scss'],
})
export class TaskSectionComponent {
  @Input()
  title: string;

  tasks: any[];
  constructor() {
    this.tasks = [];
    this.tasks.push({ name: 'name1', desc: 'desc1' });
    this.tasks.push({ name: 'name2', desc: 'desc2' });
    this.tasks.push({ name: 'name3', desc: 'desc3' });
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
