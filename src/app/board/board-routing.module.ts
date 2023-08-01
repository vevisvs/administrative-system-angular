import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'admins',
        loadChildren: () => import('./pages/admins/admins.module').then(m => m.AdminsModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [RouterModule]
})

export class BoardRoutingModule{}
