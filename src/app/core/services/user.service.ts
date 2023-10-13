import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/board/pages/users/models/users';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, switchMap} from 'rxjs/operators';
import { Firestore, collectionData, } from '@angular/fire/firestore';
import { doc, collection, deleteDoc, addDoc, updateDoc, query, getDocs, getDoc, where } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Users[] = []
  private users$: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>(this.users);

  constructor(private firestore: Firestore) {}

  getUsers(): Observable<Users[]> {
    const usersRefDoc = collection(this.firestore, 'users');
    return collectionData(usersRefDoc, {idField: 'id'}) as Observable<Users[]>;
  }

  async getTotalUsersCount(): Promise<number> {
   const refDoc = collection(this.firestore, 'users');
   const querySnapshot = await getDocs(refDoc)
   return querySnapshot.size;
  }

  findUserId(user: Users): Observable<{ id: string, data: Users } | null> {
    const userRef = collection(this.firestore, 'users');
    const queryUser = query(userRef, where('email', '==', user.email));
    return from(getDocs(queryUser)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const userData = doc.data() as Users;
          return of({ id: doc.id, data: userData });
        } else {
          return of(null);
        }
      }),
      catchError((error) => {
        console.error('Error al buscar el usuario:', error);
        return of(null);
      })
    );
  }

  getUserById(userId: string): Observable<Users | undefined> {
    const userRefDoc = doc(this.firestore, 'users', userId);
    return from(getDoc(userRefDoc)).pipe(
      switchMap(docSnap => {
        if (docSnap.exists()) {
          const adminData = docSnap.data() as Users;
          return of({ id: docSnap.id, ...adminData });
        } else {
          return of(undefined);
        }
      }),
      catchError(error => {
        console.error('Error al obtener al usuario por ID:', error);
        return of(undefined);
      })
    );
  }

  addUser(user: Users){
    const userRefDoc = collection(this.firestore, 'users');
    return addDoc(userRefDoc, user)
  }

  onEdit(userToModify: Users, userId: string): Promise<void>{
    const userRefDoc = doc(this.firestore, 'users', userId);
    const data = {
      name: userToModify.name,
      lastname: userToModify.lastname,
      email: userToModify.email,
      password: userToModify.password,
      country: userToModify.country,
      phone: userToModify.phone,
      role: userToModify.role
    };
    return updateDoc(userRefDoc, data)
  }

  onDelete(userId: string){
    const userRefDoc = doc(this.firestore, 'users', userId);
    return deleteDoc(userRefDoc)
  }

}



