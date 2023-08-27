import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map} from "rxjs";
import { catchError } from 'rxjs/operators';
// import { AdminLogin } from 'src/app/board/pages/admins/models/admin';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { loginData, loginRequest } from 'src/app/authentication/models/login';


interface dataUserLogged{
  name: string ,
  lastname: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authAdmin$ = new BehaviorSubject<loginData | null>(null);
  public authAdmin$ = this._authAdmin$.asObservable();
  private adminApiUrl = 'http://localhost:3000/admins';
  private userApiUrl = 'http://localhost:3000/users';
  private _userLoggedName: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // isAuth(): Observable<boolean> {
  //   return this.http.get<loginData[]>(this.apiUrl, {
  //     params: {
  //       token: localStorage.getItem('token') || '',
  //     }
  //   }).pipe(
  //     map((usersResult) => {
  //       return !!usersResult.length
  //     })
  //   )
  // }

  // isAuth(userType: string): Observable<boolean> {
  //   const apiUrl = userType === 'admin' ? this.adminApiUrl : this.userApiUrl; // Ajusta los nombres de las propiedades según tus propias propiedades

  //   return this.http.get<loginData[]>(apiUrl, {
  //     params: {
  //       token: localStorage.getItem('token') || '',
  //     }
  //   }).pipe(
  //     map((usersResult) => {
  //       console.log("result del isAuth:", usersResult)
  //       return !!usersResult.length;
  //     })
  //   );
  // }
  isAuth(userType: string): Observable<boolean> {
    const apiUrl = userType === 'admin' ? this.adminApiUrl : this.userApiUrl;
    const params = new HttpParams().set('token', localStorage.getItem('token') || '');
    return this.http.get<loginData[]>(apiUrl, { params }).pipe(
      map((usersResult) => usersResult.length > 0)
    );
  }

  // loginAdmin(payload: loginRequest): void {
  //   this.http
  //     .get<loginData[]>(this.apiUrl, {
  //       params: {
  //         email: payload.email || '',
  //         password: payload.password || ''
  //       }
  //     })
  //     .pipe(
  //       map((response) => (response.length > 0 ? response[0] : null)),
  //       catchError((error: HttpErrorResponse) => {
  //         this.handleError(error);
  //         return throwError(
  //           () => new Error('Algo falló. Por favor inténtalo nuevamente.')
  //         );
  //       })
  //     )
  //     .subscribe({
  //       next: (authAdmin) => {
  //         if (authAdmin) {
  //           this._authAdmin$.next(authAdmin);
  //           this.router.navigate(['/board', 'home']);
  //           localStorage.setItem('token', authAdmin.token);
  //           localStorage.setItem('user', JSON.stringify(authAdmin));
  //         } else {
  //           this._authAdmin$.next(null);
  //         }
  //       }
  //     });
  // }
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
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', authData.token);
            localStorage.setItem('userData', JSON.stringify(authData));
            this.setUserType(userType);
          } else {
            this._authAdmin$.next(null);
          }
        }
      });
  }

  // loginAdmin(payload: loginRequest, userType: string): void {
  //   const apiUrl = userType === 'admin' ? this.adminApiUrl : this.userApiUrl;

  //   this.http
  //     .get<loginData[]>(apiUrl, {
  //       params: {
  //         email: payload.email || '',
  //         password: payload.password || ''
  //       }
  //     })
  //     .pipe(
  //       map((response) => (response.length > 0 ? response[0] : null)),
  //       tap((authData) => {
  //         if (authData) {
  //           this._authAdmin$.next(authData);
  //           this.router.navigate(['/dashboard']);
  //           localStorage.setItem('token', authData.token);
  //           localStorage.setItem('userData', JSON.stringify(authData));
  //           this.setUserType(userType);
  //         } else {
  //           this._authAdmin$.next(null);
  //         }
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         console.log("login error:", error);
  //         this.handleError(error);
  //         throw new Error('Algo falló. Por favor inténtalo nuevamente.');
  //       })
  //     )
  //     .subscribe();
  // }


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

