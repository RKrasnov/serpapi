import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROUTES } from "./route";
import { BASE_PATH } from "./app.const";

const routes: Routes = [
  ...ROUTES,
  {
    path: '',
    redirectTo: BASE_PATH.HOME,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: BASE_PATH.HOME,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
