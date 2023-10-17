import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { CreateInscription, Inscription, InscriptionComplete } from '../models/inscription';
import { Store, select } from '@ngrx/store';
import { Users } from '../../users/models/users';
import { Course } from '../../../../core/services/course.service';
import { Firestore, collectionData, } from '@angular/fire/firestore';
import { doc, collection, deleteDoc, addDoc, updateDoc, query, getDocs, getDoc, where } from '@firebase/firestore';
import { selectCourses, selectUsers } from '../store/inscriptions.selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InscriptionsEffects {

  constructor(private actions$: Actions,
    private store: Store,
    private firestore: Firestore)
  {}


  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      withLatestFrom(
        this.store.pipe(select(selectUsers)),
        this.store.pipe(select(selectCourses))
      ),
      switchMap(([action, users, courses]) => {
        const payload = action.payload;
        const user = users.find((user: any) => user.id === payload.userId);
        const course = courses.find((course: any) => course.id === payload.courseId);
        if (!user || !course) {
          const errorResponse = new HttpErrorResponse({ error: 'Usuario o curso no encontrado', status: 404 });
          return of(InscriptionsActions.createInscriptionFailure({ error: errorResponse }));
        }
        const data: InscriptionComplete = { ...payload, user, course };

        return from(this.createInscription(data)).pipe(
          map(() => InscriptionsActions.createInscriptionSuccess({ data })),
          catchError(error => of(InscriptionsActions.createInscriptionFailure({ error })))
        );
      })
    );
  });


  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionsActions.loadInscriptions()))
    );
  }, { dispatch: false });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap(action =>
        from(this.deleteInscription(action.id)).pipe(
          map(() => InscriptionsActions.deleteInscriptionSuccess({ id: action.id })),
          catchError(error => of(InscriptionsActions.deleteInscriptionFailure({ error })))
        )
      )
    );
  });


  loadInscriptionss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.getInscriptions().pipe(
          map(data => InscriptionsActions.loadInscriptionsSuccess({data})),
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure(error)))
        ))
    );
  });

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadUser),
      concatMap(() =>
        this.getUsers().pipe(
          map(data => InscriptionsActions.loadUserSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadUserFailure({ error }))))
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadCourse),
      concatMap(() =>
        this.getCourses().pipe(
          map(data => InscriptionsActions.loadCourseSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadCourseFailure({ error }))))
      )
    );
  });

  loadUserInscriptions$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(InscriptionsActions.loadUserInscriptions),
    mergeMap((action) =>
      from(this.getUserInscriptions(action.userId)).pipe(
        map((inscriptions) =>
          InscriptionsActions.loadUserInscriptionsSuccess({ inscriptions })
        ),
        catchError((error) =>
          of(InscriptionsActions.loadUserInscriptionsFailure({ error }))
        )
      )
    )
  )});


  private async createInscription(data: CreateInscription): Promise<Inscription> {
    const refDocCollection = collection(this.firestore, 'inscriptions');
    const docRef = await addDoc(refDocCollection, data);
    const inscripcion: Inscription = { ...data, id: docRef.id };
    return inscripcion;
  }

  private async deleteInscription(id: string): Promise<void> {
    const inscriptionsRef = collection(this.firestore, 'inscriptions');
    const inscrDoc = await getDoc(doc(inscriptionsRef, id));
    if (inscrDoc.exists()) {
      await deleteDoc(doc(inscriptionsRef, id));
    }
  }

  private getInscriptions(): Observable<InscriptionComplete[]>{
    const refCollection = collection(this.firestore, 'inscriptions');
    return collectionData(refCollection, {idField: 'id'}) as Observable<InscriptionComplete[]>;
  }


  private getUsers(): Observable<Users[]> {
    const refCollection = collection(this.firestore, 'users');
    return collectionData(refCollection, { idField: 'id' }) as Observable<Users[]>;
  }


  private getCourses(): Observable<Course[]> {
    const refCollection = collection(this.firestore, 'courses');
    return collectionData(refCollection, { idField: 'id' }) as Observable<Course[]>;
  }


  private async getUserInscriptions(userId: string): Promise<InscriptionComplete[]> {
    const inscriptionsRef = collection(this.firestore, 'inscriptions');
    const q = query(inscriptionsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const inscriptions: InscriptionComplete[] = [];
    for (const doc of querySnapshot.docs) {
      const inscriptionData = doc.data() as InscriptionComplete;
      inscriptions.push({ ...inscriptionData, id: doc.id });
    }
    return inscriptions;
  }

}
