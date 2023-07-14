import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';
import { Users } from './models/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  name: string = '';
  lastname: string = '';
  email: string = '';
  country:  string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalUsersComponent, {
      data: {name: this.name, lastname: this.lastname, email: this.email, country: this.country},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
