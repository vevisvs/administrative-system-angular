import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminsComponent } from "./pages/admins/admins.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { UsersComponent } from "./pages/users/users.component";
import { HomeComponent } from "./pages/home/home.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admins',
        component: AdminsComponent,
        loadChildren: () => import('./pages/admins/admins.module').then((m) => m.AdminsModule)
      },
      {
        path: 'courses',
        component: CoursesComponent,
        loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
      },
      {
        path: 'home',
        component: HomeComponent,
        // loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)

      },
      {
        path: 'users',
        component: UsersComponent,
        loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
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
