import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/admin';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder){}

  cancel(): void{
    this.dialogRef.close();
  }

  save(): void{
    this.dialogRef.close(this.formAdmin.value);
  }

  formAdmin = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.minLength(2), Validators.required]],
    email: ['', [Validators.email,Validators.required]],
    password: ['', [Validators.minLength(7), Validators.required]]
  })
}
