import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export class snack {
  constructor(private snackBar: MatSnackBar) {}
  response(
    message: string,
    action?: string,
    durationInMs?: number,
    hposition?: MatSnackBarHorizontalPosition,
    vposition?: MatSnackBarVerticalPosition
  ) {
    this.snackBar.open(message, action, {
      duration: durationInMs,
      horizontalPosition: hposition,
      verticalPosition: vposition,
    });
  }
}
