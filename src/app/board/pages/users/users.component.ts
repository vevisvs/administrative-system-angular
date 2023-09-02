import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';
import { Users } from './models/users';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { createToken } from 'src/app/core/helpers/token-helper';

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
    const token = createToken(25);
    const newUser = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: '',
      lastname: '',
      email: '',
      password: '',
      country: '',
      phone: '',
      token: token
    };
    this.dialog.open(ModalUsersComponent, { data: {...newUser, role: "Usuario"}}).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.userService.addUser(result);
        } else {
          console.log("No se recibió ninguna información");
        }
      }
    });
  }

  editUser(userToModify: Users): void {
    const dialogRef = this.dialog.open(ModalUsersComponent, { data: userToModify });
    console.log("user to modify:", userToModify)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.token = userToModify.token;
        this.userService.onEdit(result)
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

