import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
