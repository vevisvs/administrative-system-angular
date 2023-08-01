import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminsComponent } from "./admins.component";
import { DetailAdminComponent } from "./components/detail-admin/detail-admin.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminsComponent,
        pathMatch: 'full'
      },
      // {
      //   path: ':id',
      //   component: DetailAdminComponent
      // }
    ])
  ],
  exports: [RouterModule]
})
export class AdminsRoutingModule{}
