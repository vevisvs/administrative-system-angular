import { Injectable } from '@angular/core';
import { Admin } from 'src/app/board/pages/admins/models/admin';
import { BehaviorSubject, Observable, map, tap, mergeMap, take} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { createToken } from '../helpers/token-helper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {
    this.loadingDataTo();
   }

  private adminUsers: Admin[] = [];
  private urlAdmins = 'http://localhost:3000/admins';
  private administrators$: BehaviorSubject<Admin[]> = new BehaviorSubject<Admin[]>(this.adminUsers);


  loadingDataTo(): void {
    this.httpClient.get<Admin[]>(this.urlAdmins, {
      headers: new HttpHeaders({
        'token': '1234456jhkjlk'
      }),
    }).pipe(
      tap(admins => this.administrators$.next(admins)),
      catchError(error => {
        console.error('Error al cargar datos de administradores:', error);
        return throwError(() => new Error('Error al cargar los datos'));
      })
    ).subscribe();
  }

  getAdmins(): Observable<Admin[]>{
    return this.administrators$.asObservable();
  }

  addAdmin(userAdmin: Admin): void{
    const token = createToken(25)
    this.httpClient.post<Admin>(this.urlAdmins, {...userAdmin, token, role: "Administrador"}).pipe(
      tap(newData => {
        const dataUpdated = [...this.administrators$.getValue(), newData];
        this.administrators$.next(dataUpdated)
      })
    ).subscribe();
  }

  deleteAdmin(adminId: number): void {
    this.httpClient.delete<Admin>(this.urlAdmins + "/" + adminId)
      .pipe(mergeMap(response => this.administrators$.pipe(
        take(1),
        map((oldValue) => oldValue.filter((admin) => admin.id !== adminId))
      )))
      .subscribe({
        next: (valueUpdated) => {
          this.administrators$.next(valueUpdated);
        }
      });
  }

  editAdmin(admin: Admin): void{
    this.httpClient.put(this.urlAdmins + "/" + admin.id, admin).pipe(
      tap(() => {
        const updatedAdministrators = this.administrators$.getValue().map(existingAdmin => {
          if (existingAdmin.id === admin.id) {
            return { ...existingAdmin, ...admin };
          }
          return existingAdmin;
        });
        this.administrators$.next(updatedAdministrators);
      }),
      catchError(error => {
        console.error('Error al editar el administrador:', error);
        return throwError(() => new Error('Error al editar los datos'));
      })
    ).subscribe();
  }

  getAdminById(adminId: number): Observable<Admin | undefined>{
    return this.administrators$.pipe(map(admin => admin.find(user => user.id === adminId)))
  }
}
