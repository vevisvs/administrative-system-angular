import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, DataEdit } from '../../models/admin';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  adminForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataEdit,
    private fb: FormBuilder){
      this.adminForm = this.fb.group({
        name: [data ? data.name : '', Validators.required],
        lastname: [data ? data.lastname : '', Validators.required],
        email: [data ? data.email : '', [Validators.required, Validators.email]],
        password: [data ? data.password : '', [Validators.required, Validators.minLength(6)]]
      })
    }

  cancel(): void{
    this.dialogRef.close();
  }

  save(): void{
    if(this.data.id){
      const userId = this.data.id
      this.dialogRef.close({...this.adminForm.value, id: userId});
    } else{
      this.dialogRef.close(this.adminForm.value)
    }
  }

}
