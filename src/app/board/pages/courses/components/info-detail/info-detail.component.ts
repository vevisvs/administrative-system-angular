import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from '../../.././../../core/services/course.service';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.scss']
})
export class InfoDetailComponent {

  courseDetail: Course | undefined;

  constructor(private route: Router,
    private rutaActiva: ActivatedRoute,
    private courseService: CourseService)
    {
      const courseId = this.rutaActiva.snapshot.params['courseId'];
      if(courseId){
        // const convertId = Number(courseId)
        this.courseService.findCourseById(courseId).subscribe({
          next: (value) =>
            this.courseDetail = value
        })
      } else {
        this.route.navigate(['board', 'courses']);
      }
    }

}
