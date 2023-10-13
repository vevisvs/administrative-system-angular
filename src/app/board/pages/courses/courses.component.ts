import { Component, OnInit} from '@angular/core';
import { Course } from './../../../core/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { CourseService } from 'src/app/core/services/course.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit{
  public role: string;

  constructor(private dialog: MatDialog,
    private courseService: CourseService,
    private authService: AuthService,
    private firestore: Firestore)
    {
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
            const data = {
              ...value,
            }
            this.courseService.add(data).then(() => {
              this.courses = this.courseService.getCourses();
            })
          }
        }
      })
  }

  eliminate(courseId: string): void{
    this.courseService.toDelete(courseId)
  }


  update(course: Course): void{
   this.dialog.open(ModalFormComponent,
      {data: course}).afterClosed().subscribe({
        next: (dataModified) => {
          if(dataModified){
            this.courseService.findCourseId(dataModified).subscribe((doc) => {
              if(doc){
                this.courseService.toUpdate(dataModified, doc.id);
              }
            })
          }
        }
      }
    )
  }


}






