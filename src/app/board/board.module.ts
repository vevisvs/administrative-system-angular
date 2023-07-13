import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    SharedModule,
    UsersModule
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
