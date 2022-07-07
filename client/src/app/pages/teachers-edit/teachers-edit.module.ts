import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersEditComponent } from './teachers-edit.component';
import { TeachersEditRoutingModule } from './teachers-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    TeachersEditRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    TeachersEditComponent
  ]
})
export class TeachersEditModule { }
