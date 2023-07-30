import { Component, OnInit} from '@angular/core';
import { Course } from './models/course';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { CourseService } from 'src/app/core/services/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit{
  constructor(private dialog: MatDialog, private courseService: CourseService){}

  courses!: Observable<Course[]>;

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
  }


  addCourse(): void{
    console.log("Agrego curso y abro el modal");
    this.dialog.open(ModalFormComponent)
      .afterClosed().subscribe({
        next: (value) => {
          if(value){
            this.courseService.add({
              title: value.title,
              startDate: value.startDate,
              finalDate: value.finalDate
            })
          }
        }
      })
  }

}
