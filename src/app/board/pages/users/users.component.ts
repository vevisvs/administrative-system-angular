import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';
import { Users } from './models/users';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { createToken } from 'src/app/core/helpers/token-helper';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  alumnos$: Observable<Users[]>;
  totalUsers = 0;
  public role: string;

  constructor(public dialog: MatDialog, private userService: UserService, private auth: AuthService) {
      this.alumnos$ = this.userService.getUsers();
      this.usersCount();
      this.role = this.auth.getUserType();
  };

  openDialog(): void {
    const newUser = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      country: '',
      phone: '',
    };
    this.dialog.open(ModalUsersComponent, { data: {...newUser, role: "Usuario"}}).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.userService.addUser(result).then(() => {
            this.alumnos$ = this.userService.getUsers();
          });;
        } else {
          console.log("No se recibió ninguna información");
        }
      }
    });
  }

  editUser(userToModify: Users): void {
    const dialogRef = this.dialog.open(ModalUsersComponent, { data: userToModify });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.findUserId(result).subscribe((doc) => {
          if (doc) {
            this.userService.onEdit(result, doc.id);
          }
        });
      };
    });
  }

  deleteUser(userId: string): void{
    this.userService.onDelete(userId);
  }

  async usersCount(): Promise<void>{
    const total = await this.userService.getTotalUsersCount();
  }

}

