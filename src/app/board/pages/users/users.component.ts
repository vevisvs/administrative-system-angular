import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';
import { Users } from './models/users';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  alumnos$: Observable<Users[]>;
  totalUsers = 0;

  constructor(public dialog: MatDialog, private userService: UserService) {
      this.alumnos$ = this.userService.getUsers();
      this.usersCount();
  };

  openDialog(): void {
    this.dialog.open(ModalUsersComponent).afterClosed().subscribe({
      next: (result) => {
        if(result){
          console.log(result)
          this.userService.addUser(
            {
              id: Date.now() + Math.floor(Math.random() * 1000),
              name: result.name,
              lastname: result.lastname,
              email: result.email,
              country: result.country,
              phone: result.phone
            }
          );
        } else{
          console.log("No se recibió ninguna información")
        }
      }
    });
  }

  editUser(userToModify: Users): void {
    const dialogRef = this.dialog.open(ModalUsersComponent, { data: userToModify });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.onEdit(result)
        console.log("user edited:", result)
      };
    });
  }

  deleteUser(userId: number): void{
    this.userService.onDelete(userId);
  }

  usersCount(){
    this.userService.getTotal().subscribe({
      next: result =>
      this.totalUsers = result
    });
  }


}

