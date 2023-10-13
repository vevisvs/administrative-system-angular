import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../../../../core/services/course.service';
import { Timestamp } from 'firebase/firestore';

@Component({
 selector: 'app-modal-form',
 templateUrl: './modal-form.component.html',
 styleUrls: ['./modal-form.component.scss']
})

export class ModalFormComponent implements OnInit {
 coursesForm: FormGroup;
 dataToEdit: boolean = false;


 constructor(
  private dialogRef: MatDialogRef<ModalFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Course
 ) {
  this.coursesForm = new FormGroup({
   title: new FormControl<string | null>('', [Validators.required, Validators.minLength(4)]),
   startDate: new FormControl<Date | null>(null, [Validators.required]),
   finalDate: new FormControl<Date | null>(null, [Validators.required])
  });
 }

 ngOnInit(): void {
  if (this.data) {
   this.dataToEdit = true;
   this.populateForm(this.data);
  }
 }

  populateForm(data: Course): void {
    const { title, startDate, finalDate } = data;
    this.coursesForm.setValue({
      title,
      startDate: startDate ? new Date(startDate) : null,
      finalDate: finalDate ? new Date(finalDate) : null
    });
  }

getErrorMessage(controlName: string) {
  const control = this.coursesForm.get(controlName);
  if (control?.hasError('required')) {
    return 'El campo es requerido';
  }
  if (control?.hasError('minlength')) {
    return 'El campo debe tener mínimo 4 caracteres';
  }
  return '';
}

//  submitForm(): void {
//   if (this.dataToEdit) {
//     const startDate = this.data.startDate;
//     const finalDate = this.data.finalDate;
//    this.dialogRef.close({...this.coursesForm.value, startDate, finalDate});
//   } else {
//    this.dialogRef.close(this.coursesForm.value);
//   }
//  }
  submitForm(): void {
    const formData = this.coursesForm.value;
    const startDate = formData.startDate ? Timestamp.fromDate(formData.startDate) : null;
    const finalDate = formData.finalDate ? Timestamp.fromDate(formData.finalDate) : null;
    if (this.dataToEdit) {
      this.dialogRef.close({ ...formData, startDate, finalDate });
    } else {
      this.dialogRef.close({ ...formData, startDate, finalDate });
    }
  }
}




