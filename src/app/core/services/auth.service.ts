import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map,} from "rxjs";
import { catchError } from 'rxjs/operators';
import { AdminLogin } from 'src/app/board/pages/admins/models/admin';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { loginRequest } from 'src/app/authentication/models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authAdmin$ = new BehaviorSubject<AdminLogin | null>(null);
  public authAdmin$ = this._authAdmin$.asObservable();
  private apiUrl = 'http://localhost:3000/admins';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  isAuth(): Observable<boolean> {
    return this.http.get<AdminLogin[]>(this.apiUrl, {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) => {
        return !!usersResult.length
      })
    )
  }

  loginAdmin(payload: loginRequest): void {
    this.http
      .get<AdminLogin[]>(this.apiUrl, {
        params: {
          email: payload.email || '',
          password: payload.password || ''
        }
      })
      .pipe(
        map((response) => (response.length > 0 ? response[0] : null)),
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(
            () => new Error('Algo falló. Por favor inténtalo nuevamente.')
          );
        })
      )
      .subscribe({
        next: (authAdmin) => {
          if (authAdmin) {
            this._authAdmin$.next(authAdmin);
            this.router.navigate(['/board']);
            localStorage.setItem('token', authAdmin.token);
          } else {
            this._authAdmin$.next(null);
          }
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 500) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
  }

}

