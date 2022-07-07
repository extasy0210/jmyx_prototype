import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { CoursesListRoutingModule } from './courses-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    CoursesListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CoursesListComponent
  ]
})
export class CoursesListModule { }
