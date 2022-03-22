import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  taskName: string = 'paceholderName';
  taskForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    console.log('asd ');
  }

  createTaskForm() {
    this.taskForm = this.formBuilder.group({
      taskNameCtrl: [this.taskName, Validators.required],
      barcode: ['', [Validators.maxLength(13)]],
      productGroupCtrl: ['', Validators.required],
      vat: ['', Validators.required],
      secondaryVat: [''],
      storages: [[]],
      salePrice: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+[0-9]*$'),
          Validators.max(9999999999),
        ],
      ],
      printer: [{ name: 'Nincs nyomtató', id: 0 }],
      color: [''],
      unit: ['', Validators.required],
    });
  }

  get taskNameCtrl() {
    return this.taskForm.get('taskNameCtrl');
  }
}
