import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { ListAdminsComponent } from './components/list-admins/list-admins.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminsComponent,
    ListAdminsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AdminsComponent
  ]
})
export class AdminsModule { }
