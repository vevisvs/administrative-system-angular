import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { TableCoursesComponent } from './components/table-courses/table-courses.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoDetailComponent } from './components/info-detail/info-detail.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CoursesComponent,
    TableCoursesComponent,
    ModalFormComponent,
    InfoDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    RouterModule
  ]
})
export class CoursesModule { }
