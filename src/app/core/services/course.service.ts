import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Firestore, collectionData, } from '@angular/fire/firestore';
import { doc, collection, deleteDoc, addDoc, updateDoc, query, getDocs, getDoc, where, Timestamp } from '@firebase/firestore';

export interface Course{
  id?: string,
  title: string | null,
  startDate: Date | null,
  finalDate: Date | null;
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private firestore: Firestore) {}

  courses: Course[] = []
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(this.courses)


  getCourses(): Observable<Course[]> {
    const courseRefCollection = collection(this.firestore, 'courses');
    return collectionData(courseRefCollection, { idField: 'id' }).pipe(
      map((courses: any[]) => {
        return courses.map((course) => {
          const startDate = (course.startDate as Timestamp).toDate();
          const finalDate = (course.finalDate as Timestamp).toDate();
          return { ...course, startDate, finalDate };
        });
      })
    );
  }


  add(newCourse: Course){
    const courseRefCollection =  collection(this.firestore, 'courses');
    return addDoc(courseRefCollection, newCourse);
  }


  toDelete(courseId: string){
    const courseDocRef = doc(this.firestore, 'courses', courseId);
    return deleteDoc(courseDocRef);
  }

  toUpdate(course: Course, courseId: string){
    const courseRef = doc(this.firestore, 'courses', courseId);
    const dataEdited = {
      title: course.title,
      startDate: course.startDate,
      finalDate: course.finalDate
    };
    return updateDoc(courseRef, dataEdited)
  }

  findCourseId(course: Course): Observable<{ id: string, data: Course } | null> {
    const courseRefCollection = collection(this.firestore, 'courses');
    const courseQuery = query(courseRefCollection, where('title', '==', course.title));
    return from(getDocs(courseQuery)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const courseData = doc.data() as Course;
          return of({ id: doc.id, data: courseData });
        } else {
          return of(null);
        }
      }),
      catchError((error) => {
        console.error('Error al buscar el curso:', error);
        return of(null);
      })
    );
  }

  findCourseById(courseId: string): Observable<Course | undefined>{
    const courseRef = doc(this.firestore, 'admins', courseId);
    return from(getDoc(courseRef)).pipe(
      switchMap(docSnap => {
        if (docSnap.exists()) {
          const adminData = docSnap.data() as Course;
          return of({ id: docSnap.id, ...adminData });
        } else {
          return of(undefined);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el curso por ID:', error);
        return of(undefined);
      })
    );
  }


}




