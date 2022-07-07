import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesEditComponent } from './courses-edit.component';
import { CoursesEditRoutingModule } from './courses-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    CoursesEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CoursesEditComponent
  ]
})
export class CoursesEditModule { }
