import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/board/pages/users/models/users';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Users[] = []

  private users$: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>(this.users);

  getUsers(): Observable<Users[]>{
    return this.users$.asObservable();
  }

  getTotal(): Observable<number>{
    return this.users$.pipe(
      map(users => users.length)
    );
  }

  addUser(user: Users): void{
    this.users = [...this.users, user]
    this.users$.next(this.users)
  }

  onEdit(userToModify: Users){
    const index = this.users.findIndex(u => u.id === userToModify.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userToModify };
      this.users$.next([...this.users]);
    }
  }

  onDelete(userId: number){
    const filteredUsers = this.users.filter((user) => user.id !== userId);
    this.users = [...filteredUsers];
    this.users$.next(filteredUsers);
  }

}



