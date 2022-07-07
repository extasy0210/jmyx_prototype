import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesEditComponent } from './courses-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesEditRoutingModule { }
