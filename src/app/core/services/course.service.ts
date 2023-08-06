import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap, mergeMap, throwError } from 'rxjs';
import { Course } from 'src/app/board/pages/courses/models/course';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
    this.loadingCourses();
   }

  courses: Course[] = [
    // {id: 1, title: 'JavaScript', startDate: new Date('2023-07-24'), finalDate: new Date('2023-09-15')},
    // {id: 2, title: 'ReactJS', startDate: new Date('2023-08-10'), finalDate: new Date('2023-10-03')},
    // {id: 3, title: 'Angular', startDate: new Date('2023-08-23'), finalDate: new Date('2023-10-15')},
  ]

  private urlCourses = "http://localhost:3000/courses"
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(this.courses)

  getCourses(): Observable<Course[]>{
    return this.courses$.asObservable();
  }

  loadingCourses(): void{
    this.http.get<Course[]>(this.urlCourses).pipe(
      tap(response => {
        this.courses$.next(response)
      }),
      catchError(error => {
        console.log("Hubo un error", error);
        return throwError(() => new Error("Hubo un error al intentar obtener los cursos"))
      })
    ).subscribe();
  }

  add(newCourse: Course): void{
    // this.courses$.next([...this.courses, {...newCourse, id: this.courses.length + 1}])
    this.http.post<Course>(this.urlCourses, newCourse).pipe(
      mergeMap(courseToCreated => {
        return this.courses$.pipe(
          take(1),
          map((data) => [...data, {...courseToCreated, id: Date.now() + Math.floor(Math.random() * 1000)}])
        );
      })
    ).subscribe({
      next: (result) => {
        this.courses$.next(result);
      }
    });
  }

  toDelete(courseId: number): void{
    this.http.delete<Course>(this.urlCourses + "/" + courseId).pipe(
      tap(result => {
        const dataFiltered = this.courses$.getValue().filter((course) => course.id !== courseId)
        const newData = [...dataFiltered]
        this.courses$.next(newData)
      }),
      catchError(err => {
        console.log("Ocurrió un error", err);
        return throwError(() => new Error("Ocurrió un error al intentar eliminar al curso"))
      })
    ).subscribe();
  }

  toUpdate(course: Course): void {
    this.http.put<Course>(this.urlCourses + "/" + course.id, course).pipe(
      mergeMap(response => this.courses$.pipe(
        take(1),
        map(courses => {
          const index = courses.findIndex(c => c.id === course.id);
          if (index !== -1) {
            this.courses[index] = { ...this.courses[index], ...course };
          }
          return this.courses;
        })
      )),
      tap(updatedCourses => {
        this.courses$.next(updatedCourses);
      })
    ).subscribe();
  }

  getCourseById(courseId: number): Observable<Course | undefined>{
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === courseId))
    );
  }
}




