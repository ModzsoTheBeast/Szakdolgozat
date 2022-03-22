import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/helpers/dialog';
import { ListServiceService } from 'src/app/services/list-service/list-service.service';

@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.scss'],
})
export class CreateListDialogComponent implements OnInit {
  taskName: string = 'paceholderName';
  listForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateListDialogComponent>,
    private listService: ListServiceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData
  ) {
    this.createListForm();
  }

  ngOnInit(): void {}

  submit() {
    console.log('asd ');
    console.log(this.data);

    this.listService
      .createList({
        listName: this.data.title.trim(),
      })
      .subscribe(
        (next) => {
          this.snackBar.open('sikerult letrehozni a listat', '', {
            duration: 2000,
          });
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.snackBar.open('Nem sikerult letrehozni a listat', '', {
            duration: 2000,
          });
          this.dialogRef.close();
        }
      );
  }

  createListForm() {
    this.listForm = this.formBuilder.group({
      listNameCtrl: ['', Validators.required],
    });
  }

  get listNameCtrl() {
    return this.listForm.get('listNameCtrl');
  }
}
