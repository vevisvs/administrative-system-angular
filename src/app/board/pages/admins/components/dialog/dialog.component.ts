import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, DataEdit } from '../../models/admin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  adminForm: FormGroup;
  formToEdit: Boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataEdit,
    private fb: FormBuilder){
      this.adminForm = this.fb.group({
        name: [data ? data.name : '', [Validators.required, Validators.minLength(3)]],
        lastname: [data ? data.lastname : '', [Validators.required, Validators.minLength(2)]],
        email: [data ? data.email : '', [Validators.required, Validators.email]],
        password: [data ? data.password : '', [Validators.required, Validators.minLength(7)]]
      })
    }

  cancel(): void{
    this.dialogRef.close();
  }

  save(): void{
    if(this.data.name){
      const dataToEdit = {
        ...this.adminForm.value
      }
      // const userId = this.data.id
      const roleAdmin = this.data.role
      // dataWithToken['token'] = this.data.token
      this.dialogRef.close({...this.adminForm.value, role: roleAdmin});
    } else{
      console.log("data creada nueva:", this.adminForm.value)
      this.dialogRef.close({...this.adminForm.value, role: "Administrador"})
    }
  }



}
