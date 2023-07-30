import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models/course';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  constructor(private dialogRef: MatDialogRef<ModalFormComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Course){}

    titleControl = new FormControl<string | null>('', [Validators.required, Validators.minLength(5)]);
    startDateControl = new FormControl<string | null>('', [Validators.required]);
    finalDateControl = new FormControl<string | null>('', [Validators.required]);

  coursesForm = new FormGroup({
    title: this.titleControl,
    startDate: this.startDateControl,
    finalDate: this.finalDateControl
  })


  getErrorMessage(formControl: FormControl): string{
    switch (formControl) {
      case this.titleControl:
        if(formControl.hasError('required')){
          return'El campo es requerido';
        } else if(formControl.hasError('minlength')){
          return 'El campo debe tener mínimo 5 caracteres'
        }
        break;
      case this.startDateControl:
        if(formControl.hasError('required')){
          return 'El campo es requerido'
        }
        break;
      case this.finalDateControl:
        if(formControl.hasError('required')){
          return 'El campo es requerido'
        }
        break;
      default:
        break;
    }
    return '';
  }

  submitForm(): void{
    this.dialogRef.close(this.coursesForm.value);
  }
}
