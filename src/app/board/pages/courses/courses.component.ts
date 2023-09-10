import { Component, OnInit} from '@angular/core';
import { Course } from './models/course';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { CourseService } from 'src/app/core/services/course.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit{
  public role: string;

  constructor(private dialog: MatDialog,
    private courseService: CourseService,
    private authService: AuthService){
      this.role = this.authService.getUserType();
    }

  courses!: Observable<Course[]>;

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
  }

  addCourse(): void{
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

  eliminate(courseId: number): void{
    this.courseService.toDelete(courseId)
  }


  update(course: Course): void{
   this.dialog.open(ModalFormComponent,
      {data: course}).afterClosed().subscribe(value => {
        this.courseService.toUpdate(value);
      }
    )
  }

}




