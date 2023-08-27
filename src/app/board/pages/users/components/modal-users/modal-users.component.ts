import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from '../../models/users';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.scss']
})

export class ModalUsersComponent {
  isEditMode: boolean = false;
  formUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data;
    this.formUser = this.createForm();

    if (this.isEditMode) {
      this.populateForm();
      this.applyValidations();
    }
  }


  createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  populateForm(): void {
    this.formUser.patchValue({
      id: this.data.id,
      name: this.data.name,
      lastname: this.data.lastname,
      email: this.data.email,
      password: this.data.password,
      country: this.data.country,
      phone: this.data.phone,
      token: this.data.token
    });
  }

  applyValidations(): void {
    this.formUser.get('name')?.setValidators([Validators.required, Validators.minLength(3)]);
    this.formUser.get('lastname')?.setValidators([Validators.required, Validators.minLength(2)]);
    this.formUser.get('email')?.setValidators([Validators.required, Validators.email]);
    this.formUser.get('password')?.setValidators([Validators.required, Validators.minLength(7)]);
    this.formUser.get('country')?.setValidators([Validators.required]);
    this.formUser.get('phone')?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
    this.formUser.updateValueAndValidity();
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  agregar(): void{
    if(this.data.token){
      this.dialogRef.close({...this.formUser.value, token: this.data.token, role: this.data.role})
    }
  }

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
      } else if (errorObj['minlength'] && inputName === 'password') {
        error = 'Este campo debe tener como mínimo 7 caracteres';
      }else if(errorObj['email']) {
        error = 'El email debe tener un formato válido';
      } else if(errorObj['pattern']){
        error = 'Debe ingresar un numero de teléfono válido'
      }
    }
    return error;
  }
}


