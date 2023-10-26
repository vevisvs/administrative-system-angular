import { Injectable } from '@angular/core';
import { Admin } from 'src/app/board/pages/admins/models/admin';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Firestore, collectionData, } from '@angular/fire/firestore';
import { doc, collection, deleteDoc, addDoc, updateDoc, query, getDocs, getDoc, where } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUsers: Admin[] = [];
  private administrators$: BehaviorSubject<Admin[]> = new BehaviorSubject<Admin[]>(this.adminUsers);

  constructor(private firestore: Firestore) { }


  getAdmins(): Observable<Admin[]>{
    const adminRef = collection(this.firestore, 'admins');
		return collectionData(adminRef, {idField: 'id'
		}) as Observable<Admin[]>;
  }


  addAdmin(userAdmin: Admin){
    const adminRef = collection(this.firestore, 'admins');
    return addDoc(adminRef, userAdmin)
  }

  deleteAdmin(adminId: string){
    const adminRefDoc = doc(this.firestore, `admins/${adminId}`);
		return deleteDoc(adminRefDoc);
  }

  findAdmin(admin: Admin): Observable<{ id: string, data: Admin } | null> {
    const adminRef = collection(this.firestore, 'admins');
    const adminQuery = query(adminRef, where('email', '==', admin.email));
    return from(getDocs(adminQuery)).pipe(
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const adminData = doc.data() as Admin;
          return of({ id: doc.id, data: adminData });
        } else {
          return of(null);
        }
      }),
      catchError((error) => {
        console.error('Error al buscar el administrador:', error);
        return of(null);
      })
    );
  }

  editAdmin(updatedAdmin: Admin, documentId: string): Promise<void> {
    const adminRefDoc = doc(this.firestore, 'admins', documentId );
    const updatedData = {
      name: updatedAdmin.name,
      lastname: updatedAdmin.lastname,
      email: updatedAdmin.email,
      password: updatedAdmin.password,
      role: updatedAdmin.role
    };
    return updateDoc(adminRefDoc, updatedData);
  }

  getAdminById(adminId: string): Observable<Admin | undefined> {
    const adminRefDoc = doc(this.firestore, 'admins', adminId);

    return from(getDoc(adminRefDoc)).pipe(
      switchMap(docSnap => {
        if (docSnap.exists()) {
          const adminData = docSnap.data() as Admin;
          return of({ id: docSnap.id, ...adminData });
        } else {
          return of(undefined);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el administrador por ID:', error);
        return of(undefined);
      })
    );
  }

}
