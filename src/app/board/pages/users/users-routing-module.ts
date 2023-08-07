import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";
import { DetailUsersComponent } from "./components/detail-users/detail-users.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        pathMatch: 'full'
      },
      {
        path: 'users/:id',
        component: DetailUsersComponent
      }
  ])
  ],
  exports: [RouterModule],
})

export class UsersRoutingModule {}
