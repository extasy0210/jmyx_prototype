import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersListComponent } from './teachers-list.component';
import { TeachersListRoutingModule } from './teachers-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    TeachersListRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    TeachersListComponent
  ]
})
export class TeachersListModule { }
