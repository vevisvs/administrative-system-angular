import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';



@NgModule({
  declarations: [
    UsersComponent,
    ListUsersComponent,
    ModalUsersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
