import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { UsersComponent } from './board/pages/users/users.component';
import { HomeComponent } from './board/pages/home/home.component';
import { AdminsComponent } from './board/pages/admins/admins.component';
import { CoursesComponent } from './board/pages/courses/courses.component';
import { DetailUsersComponent } from './board/pages/users/components/detail-users/detail-users.component';

const routes: Routes = [
  {
    path: "board",
    component: BoardComponent,
    children: [
      {
        path: "home", component: HomeComponent
      },
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "users/:id",
        component: DetailUsersComponent
      },
      {
        path: "admins", component: AdminsComponent
      },
      {
        path: "courses", component: CoursesComponent
      },
      {
        path: "**",
        redirectTo: "home"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "board"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
