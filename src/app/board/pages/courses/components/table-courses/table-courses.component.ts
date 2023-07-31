import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.scss']
})
export class TableCoursesComponent {

  @Input() dataSource: Course[] = [];
  @Output() update = new EventEmitter();
  @Output() eliminate = new EventEmitter();

  displayedColumns: string[] = ['ID', 'Título', 'Fecha de inicio', 'Fecha de culminación', 'Opciones'];

}