import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { ListAdminsComponent } from './components/list-admins/list-admins.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminsComponent,
    ListAdminsComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminsComponent
  ]
})
export class AdminsModule { }
