import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, from, of} from "rxjs";
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { loginData, loginRequest } from 'src/app/authentication/models/login';
import { Firestore, DocumentData } from '@angular/fire/firestore';
import { collection, query, getDocs, where } from '@firebase/firestore';
import { AdminService } from './admin.service';
import { UserService } from './user.service';
import { Users } from 'src/app/board/pages/users/models/users';
import { Admin } from 'src/app/board/pages/admins/models/admin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authAdmin$ = new BehaviorSubject<loginData | null>(null);
  public authAdmin$ = this._authAdmin$.asObservable();
  private invalidCredentials: boolean = false;

  constructor(
    private firestore: Firestore,
    private as: AdminService,
    private us: UserService,
    private router: Router
  ) {}


  isAuth(userType: string): Observable<boolean> {
    return this.getCollections(userType).pipe(
      map(usersResult => usersResult.length > 0)
    );
  }


  getCollections(userType: string): Observable<Admin[] | Users[]> {
    if (userType === 'admin') {
      return this.as.getAdmins();
    } else {
      return this.us.getUsers();
    }
  }


  loginAdmin(payload: loginRequest, userType: string) {
    this.getCollections(userType)
      .pipe(
        switchMap((collection) => {
          if (collection.length > 0) {
            return this.finder(payload, userType);
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (authData: loginData | null) => {
          if (authData) {
            this._authAdmin$.next(authData);
            this.router.navigate(['/board', 'home']);
            localStorage.setItem('userData', JSON.stringify(authData));
            this.setUserType(userType);
          } else {
            this.invalidCredentials = true;
            this._authAdmin$.next(null);
          }
        }
      });
  }

  finder(payload: loginRequest, type: string): Observable<loginData | null> {
    const ref = type === 'admin' ? collection(this.firestore, 'admins') : collection(this.firestore, 'users');
    const q = query(ref, where('email', '==', payload.email));
    return from(getDocs(q)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data() as DocumentData;
          const authData: loginData = {
            id: data['id'],
            name: data['name'],
            lastname: data['lastname'],
            email: data['email'],
            password: data['password'],
            phone: data['phone'],
            country: data['country'],
            token: data['token'],
            role: data['role']
          };
          return of(authData);
        } else {
          return of(null);
        }
      })
    );
  }


  isInvalidCredentials(): boolean {
    return this.invalidCredentials;
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


  setUserType(userType: string): void {
    localStorage.setItem('userType', userType);
  }

  getUserType(): string {
    return localStorage.getItem('userType') || '';
  }

}

