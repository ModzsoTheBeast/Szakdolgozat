import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderServiceService {
  _isLoggedIn: boolean = false;

  _isLoggedInSource: Subject<boolean> = new Subject();

  get isLoggedInSource(): Subject<boolean> {
    return this._isLoggedInSource;
  }

  set isLoggedInSource(src: Subject<boolean>) {
    this._isLoggedInSource = src;
  }

  constructor() {}

  changeIsLoggedIn(n: boolean) {
    this.isLoggedInSource.next(n);
  }
}
