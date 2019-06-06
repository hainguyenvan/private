import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // home page
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule'
  },

  {
    path: 'home-page',
    loadChildren: './pages/home/home.module#HomeModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
