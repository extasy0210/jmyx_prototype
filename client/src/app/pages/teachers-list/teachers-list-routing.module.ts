import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersListComponent } from './teachers-list.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersListRoutingModule { }
