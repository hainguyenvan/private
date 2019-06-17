import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Admin1Component } from './admin1.component';

const routes: Routes = [
  {
    path: '',
    component: Admin1Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Admin1Routing { }
