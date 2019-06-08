import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ClientRoutes } from './pages/client/client.routing';
import { AdminRoutes } from './pages/admin/admin.routing';

const routesClient: Routes = ClientRoutes;
const routesAdmin: Routes = AdminRoutes;

@NgModule({
  imports: [
    RouterModule.forRoot(routesClient, {
      preloadingStrategy: PreloadAllModules
    }),
    RouterModule.forRoot(routesAdmin, {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRouting { }
