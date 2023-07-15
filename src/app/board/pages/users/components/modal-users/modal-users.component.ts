import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from '../../models/users';
import { FormBuilder } from '@angular/forms';
import { Output } from '@angular/core'

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.scss']
})

export class ModalUsersComponent  {
  // @Output() dataFormUser = new EventEmitter();

  // public dataUser: any = [] //variable para almacenar los datos del form

  constructor(
    public dialogRef: MatDialogRef<ModalUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private fb: FormBuilder
  ) { }

  formUser = this.fb.group({
    name: [''],
    lastname: [''],
    email: [''],
    country: [''],
    phone: []
  })

  cancelar(): void {
    this.dialogRef.close(); //cierra el form
  }

  agregar(): void{
    this.dialogRef.close(this.formUser.value); //cierra el form y envia su valor
  }

}
