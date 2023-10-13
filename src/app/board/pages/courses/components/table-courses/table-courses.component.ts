import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Course } from '../../../../../core/services/course.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.scss']
})
export class TableCoursesComponent {

  public roleType: string;

  constructor(private authService: AuthService){
    this.roleType = this.authService.getUserType();
  }

  @Input() dataSource: Course[] = [];
  @Output() update = new EventEmitter();
  @Output() eliminate = new EventEmitter();

  displayedColumns: string[] = ['ID', 'Título', 'Fecha de inicio', 'Fecha de culminación', 'Opciones'];

}
