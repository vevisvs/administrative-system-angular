import { Injectable } from '@angular/core';
import { Course } from 'src/app/board/pages/courses/models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  courses: Course[] = [
    {id: 1, title: 'JavaScript', startDate: '24-07-23', finalDate: '15-09-23'},
    {id: 2, title: 'ReactJS', startDate: '07-08-23', finalDate: '03-10-23'},
    {id: 3, title: 'Angular', startDate: '13-08-23', finalDate: '15-10-23'},
  ]

  add(course: Course): void{

  }
}
