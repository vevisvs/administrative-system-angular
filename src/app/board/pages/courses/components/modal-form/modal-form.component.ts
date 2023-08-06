import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../models/course';

// interface CourseFormData {
//  title: string | null;
//  startDate: Date | null;
//  finalDate: Date | null;
// }

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
  this.coursesForm.setValue({ title, startDate: startDate ? new Date(startDate) : null, finalDate: finalDate ? new Date(finalDate) : null });
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

 submitForm(): void {
  if (this.dataToEdit) {
   const id = { id: this.data.id };
   const dataUpdated = { ...this.coursesForm.value, ...id };
   this.dialogRef.close(dataUpdated);
  } else {
   this.dialogRef.close(this.coursesForm.value);
  }
 }
}




