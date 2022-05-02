import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  color$: Observable<colorObj>;
  private colorSubject = new Subject<colorObj>();

  constructor() {
    this.color$ = this.colorSubject.asObservable();
  }

  changeColor(color: colorObj) {
    this.colorSubject.next(color);
  }
}

export interface colorObj {
  color: string;
  id: number;
}
