import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/board/pages/courses/models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  courses: Course[] = [
    {id: 1, title: 'JavaScript', startDate: '24-07-2023', finalDate: '15-09-2023'},
    {id: 2, title: 'ReactJS', startDate: '07-08-2023', finalDate: '03-10-2023'},
    {id: 3, title: 'Angular', startDate: '13-08-2023', finalDate: '15-10-2023'},
  ]

  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(this.courses)

  getCourses(): Observable<Course[]>{
    return this.courses$.asObservable();
  }

  add(newCourse: Course): void{
    this.courses$.next([...this.courses, {...newCourse, id: this.courses.length + 1}])
  }
}
