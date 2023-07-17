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

  public alumnos: Users[] = []

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ModalUsersComponent).afterClosed().subscribe({
      next: (result) => {
        if(result){
          console.log(result)
          this.alumnos = [
            ...this.alumnos,
            {
                id: Date.now() + Math.floor(Math.random() * 1000),
                name: result.name,
                lastname: result.lastname,
                email: result.email,
                country: result.country,
                phone: result.phone
            },
          ]
          console.log("alumnos:", this.alumnos)
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
        console.log('Usuario modificado:', result);
        const updatedUserIndex = this.alumnos.findIndex(alumno => alumno.id === userToModify.id);
        if (updatedUserIndex !== -1) {
          this.alumnos[updatedUserIndex] = result;
          this.alumnos = this.alumnos.slice();
        }
      } else {
        console.log('Modificación de usuario cancelada');
      }
    });
  }

  deleteUser(alumnoId: number): void{
    this.alumnos = this.alumnos.filter(alumno => alumno.id != alumnoId);
  }

}

