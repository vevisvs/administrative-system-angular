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

  public alumnos: Users[] = [] //variable para almacenar la lista de alumnos registrados
  public nextId: number = 1; //variable incremental que funciona como id para la tabla

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ModalUsersComponent).afterClosed().subscribe({  //me susbscribo al evento de cierre, para escucharlo e implementar una lógica después
      next: (result) => {
        if(result){
          console.log(result)
          this.alumnos = [
            ...this.alumnos,
            {
                id: this.nextId++,
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

}

