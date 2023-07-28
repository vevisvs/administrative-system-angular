import { Injectable } from '@angular/core';
import { Admin } from 'src/app/board/pages/admins/models/admin';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private adminUsers: Admin[] = [
    {id: 1980346700211, name: 'Adriana', lastname: "Canal", email: "adri@example.com", password: "123456789"},
  ];

  private administrators$: BehaviorSubject<Admin[]> = new BehaviorSubject<Admin[]>(this.adminUsers);

  getAdmins(): Observable<Admin[]>{
    return this.administrators$.asObservable();
  }

  addAdmin(userAdmin: Admin): void{
    this.adminUsers = [...this.adminUsers, userAdmin];
    this.administrators$.next(this.adminUsers);
  }

  deleteAdmin(adminId: number): void{
    this.adminUsers = this.adminUsers.filter((admin) => admin.id !== adminId);
    this.administrators$.next(this.adminUsers);
  }
}
