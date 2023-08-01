import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Course } from 'src/app/board/pages/courses/models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  courses: Course[] = [
    {id: 1, title: 'JavaScript', startDate: new Date('2023-07-24'), finalDate: new Date('2023-09-15')},
    {id: 2, title: 'ReactJS', startDate: new Date('2023-08-10'), finalDate: new Date('2023-10-03')},
    {id: 3, title: 'Angular', startDate: new Date('2023-08-23'), finalDate: new Date('2023-10-15')},
  ]

  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(this.courses)

  getCourses(): Observable<Course[]>{
    return this.courses$.asObservable();
  }

  add(newCourse: Course): void{
    this.courses$.next([...this.courses, {...newCourse, id: this.courses.length + 1}])
  }

  toDelete(courseId: number): void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayCourses) => {
        this.courses$.next(arrayCourses.filter((course) => course.id !== courseId));
      },
    });
  }

  toUpdate(course: Course): void{
  const id = this.courses.findIndex((c) => c.id === course.id);
    if(id !== -1){
      this.courses[id] = {...this.courses[id], ...course};
      this.courses$.next([...this.courses]);
    }
  }

  getCourseById(courseId: number): Observable<Course | undefined>{
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === courseId))
    );
  }
}




