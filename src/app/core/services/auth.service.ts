import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map} from "rxjs";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { loginData, loginRequest } from 'src/app/authentication/models/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authAdmin$ = new BehaviorSubject<loginData | null>(null);
  public authAdmin$ = this._authAdmin$.asObservable();
  private adminApiUrl = 'http://localhost:3000/admins';
  private userApiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  isAuth(userType: string): Observable<boolean> {
    const apiUrl = userType === 'admin' ? this.adminApiUrl : this.userApiUrl;
    const params = new HttpParams().set('token', localStorage.getItem('token') || '');
    return this.http.get<loginData[]>(apiUrl, { params }).pipe(
      map((usersResult) => usersResult.length > 0)
    );
  }

  loginAdmin(payload: loginRequest, userType: string): void {
    const apiUrl = userType === 'admin' ? this.adminApiUrl : this.userApiUrl;
    this.http
      .get<loginData[]>(apiUrl, {
        params: {
          email: payload.email || '',
          password: payload.password || ''
        }
      })
      .pipe(
        map((response) => (response.length > 0 ? response[0] : null)),
        catchError((error: HttpErrorResponse) => {
          console.log("login error:", error)
          this.handleError(error);
          return throwError(
            () => new Error('Algo falló. Por favor inténtalo nuevamente.')
          );
        })
      )
      .subscribe({
        next: (authData) => {
          console.log("authdata:", authData)
          if (authData) {
            this._authAdmin$.next(authData);
            this.router.navigate(['/board', 'home']);
            localStorage.setItem('token', authData.token);
            localStorage.setItem('userData', JSON.stringify(authData));
            this.setUserType(userType);
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

  getUserDataFromLocalStorage(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this._authAdmin$.next(user);
    }
  }

  setUserType(userType: string): void {
    localStorage.setItem('userType', userType);
  }

  getUserType(): string {
    return localStorage.getItem('userType') || '';
  }

}

