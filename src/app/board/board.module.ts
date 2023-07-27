import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { HomeModule } from './pages/home/home.module';
import { AdminsModule } from './pages/admins/admins.module';
import { CoursesModule } from './pages/courses/courses.module';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    SharedModule,
    UsersModule,
    HomeModule,
    AdminsModule,
    CoursesModule
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
