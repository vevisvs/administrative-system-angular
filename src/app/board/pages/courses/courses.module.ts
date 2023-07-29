import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { TableCoursesComponent } from './components/table-courses/table-courses.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CoursesComponent,
    TableCoursesComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoursesModule { }
