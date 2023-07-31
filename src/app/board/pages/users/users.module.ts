import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailUsersComponent } from './components/detail-users/detail-users.component';
import { UsersRoutingModule } from './users-routing-module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsersComponent,
    ListUsersComponent,
    ModalUsersComponent,
    DetailUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    RouterModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
