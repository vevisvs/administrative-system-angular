import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from '../../models/users';
import { FormBuilder, Validators } from '@angular/forms';
import { Output } from '@angular/core'

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.scss']
})

export class ModalUsersComponent  {
  constructor(
    public dialogRef: MatDialogRef<ModalUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private fb: FormBuilder
  ) { }

  formUser = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    country: ['', [Validators.required]],
    phone: ['' ,[Validators.required, Validators.pattern('^[0-9]+$')]]
  })

  cancelar(): void {
    this.dialogRef.close(); //cierra el form
  }

  agregar(): void{
    this.dialogRef.close(this.formUser.value); //cierra el form y envia su valor
  }

  //funcion auxiliar para manejar errores del form y enviar mensaje al usuario:
  public getError(inputName: string): string {
    let error = '';
    const control = this.formUser.get(inputName);
    if (control?.touched && control.errors) {
      const errorObj = control.errors;
      if (errorObj['required']) {
        error = 'Este campo es obligatorio';
      } else if (errorObj['minlength'] && inputName === 'name') {
        error = 'Este campo debe tener como mínimo 3 caracteres';
      } else if (errorObj['minlength'] && inputName === 'lastname') {
        error = 'Este campo debe tener como mínimo 2 caracteres';
      } else if(errorObj['email']) {
        error = 'El email debe tener un formato válido';
      } else if(errorObj['pattern']){
        error = 'Debe ingresar un numero de teléfono válido'
      }
    }
    return error;
  }
}


