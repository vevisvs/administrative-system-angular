import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/board/pages/users/models/users';
import { BehaviorSubject, map, tap, mergeMap, take, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { createToken } from '../helpers/token-helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Users[] = []

  constructor(private httpClient: HttpClient) {
    this.loadData();
  }

  private urlUsers = "http://localhost:3000/users"
  private users$: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>(this.users);

  loadData(): void {
    this.httpClient.get<Users[]>(this.urlUsers, {
      headers: new HttpHeaders({
        'token': '1554456jhkjlk'
      }),
    }).pipe(
      tap(u => this.users$.next(u)),
      catchError(error => {
        console.log("error al cargar los datos de los usuarios", error)
        return throwError(() => new Error('Hubo un error al cargar a los usuarios'))
      })
    ).subscribe();
  }

  getUsers(): Observable<Users[]> {
    return this.users$.asObservable();
  }

  getTotal(): Observable<number> {
    return this.users$.pipe(
      map(users => users.length)
    );
  }

  getUserById(userId: number): Observable<Users | undefined> {
    console.log("detalle del usuario:", userId)
    return this.users$.pipe(
      map(users => users.find(user => user.id === userId))
    );
  }

  addUser(user: Users): void {
    const token = createToken(25)
    this.httpClient.post<Users>(this.urlUsers, {...user, token}).pipe(
      tap(createdData => {
        const newData = [...this.users$.getValue(), createdData]
        this.users$.next(newData)
      }),
      catchError(err => {
        console.log("Algo salió mal", err);
        return throwError(() => new Error("Ocurrió un error al intentar agregar un usuario"))
      })
    ).subscribe();
  }


onEdit(userToModify: Users){
  this.httpClient.put(this.urlUsers + "/" + userToModify.id, userToModify).pipe(
    tap(() => {
      const updatedUsers = this.users$.getValue().map(existingUser => {
        if (existingUser.id === userToModify.id) {
          return { ...existingUser, ...userToModify };
        }
        return existingUser;
      });
      this.users$.next(updatedUsers);
    }),
    catchError(error => {
      console.error('Error al editar el usuario:', error);
      return throwError(() => new Error('Error al editar los datos del usuario'));
    })
  ).subscribe();
}

onDelete(userId: number){
  this.httpClient.delete<Users>(this.urlUsers + "/" + userId).pipe(
    tap(value => {
      const arrayFilter = this.users$.getValue().filter((user) => user.id !== userId);
      const filteredUsers = [...arrayFilter]
      this.users$.next(filteredUsers)
    }),
    catchError(error => {
      console.log("Ocurrio un error", error);
      return throwError(() => new Error("Ocurrio un error al intentar eliminar al usuario"))
    })
  ).subscribe();
}


}



