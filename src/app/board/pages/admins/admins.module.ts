import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { ListAdminsComponent } from './components/list-admins/list-admins.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailAdminComponent } from './components/detail-admin/detail-admin.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AdminsComponent,
    ListAdminsComponent,
    DialogComponent,
    DetailAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminsRoutingModule,
    RouterModule,
  ],
  exports: [
    AdminsComponent
  ]
})
export class AdminsModule { }
