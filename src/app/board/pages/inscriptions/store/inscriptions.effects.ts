import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscription, Inscription, InscriptionComplete } from '../models/inscription';
import { Store } from '@ngrx/store';
import { Users } from '../../users/models/users';
import { Course } from '../../courses/models/course';

@Injectable()
export class InscriptionsEffects {

  constructor(private actions$: Actions,
    private store: Store,
    private http: HttpClient)
  {}

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        this.createInscription(action.payload).pipe(
          map(data => InscriptionsActions.createInscriptionSuccess({ data })),
          catchError(error => of(InscriptionsActions.createInscriptionFailure({ error }))))
      )
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
        this.deleteInscription(action.id).pipe(
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
      this.getUserInscriptions(action.userId).pipe(
        map((inscriptions) =>
          InscriptionsActions.loadUserInscriptionsSuccess({ inscriptions })
        ),
        catchError((error) =>
          of(InscriptionsActions.loadUserInscriptionsFailure({ error }))
        )
      )
    )
  )});

  private createInscription(data: CreateInscription): Observable<Inscription> {
    return this.http.post<Inscription>('http://localhost:3000/inscriptions', data)
  }

  private deleteInscription(id: number): Observable<Inscription> {
    return this.http.delete<Inscription>(`http://localhost:3000/inscriptions/${id}`);
  }

  private getInscriptions(): Observable<InscriptionComplete[]>{
    return this.http.get<InscriptionComplete[]>('http://localhost:3000/inscriptions?_expand=user&_expand=course')
  }

  private getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('http://localhost:3000/users')
  }

  private getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:3000/courses');
  }

  private getUserInscriptions(userId: number): Observable<InscriptionComplete[]> {
    const url = `http://localhost:3000/inscriptions?userId=${userId}&_expand=course`;
    return this.http.get<InscriptionComplete[]>(url);
  }

}
