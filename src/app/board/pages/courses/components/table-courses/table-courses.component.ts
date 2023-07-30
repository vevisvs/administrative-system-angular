import { Component, Input, Output} from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.scss']
})
export class TableCoursesComponent {

  @Input() dataSource: Course[] = [];

  displayedColumns: string[] = ['ID', 'Título', 'Fecha de inicio', 'Fecha de culminación', 'Opciones'];

}
