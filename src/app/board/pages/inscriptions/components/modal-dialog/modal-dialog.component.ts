import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscription, InscriptionComplete } from '../../models/inscription';
import { Users } from '../../../users/models/users';
import { Course } from '../../../courses/models/course';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCourses, selectUsers } from '../../store/inscriptions.selectors';
import { InscriptionsActions } from '../../store/inscriptions.actions';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent{

  inscriptionForm: FormGroup;
  users$: Observable<Users[]>;
  courses$: Observable<Course[]>;

  constructor(private store: Store, public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscription, private formBuilder: FormBuilder){
      this.inscriptionForm = this.formBuilder.group({
        userId: ['', [Validators.required]],
        courseId: ['', [Validators.required]],
        dateOfInscription: ['', [Validators.required]]
      }),
      this.users$ = this.store.select(selectUsers);
      this.courses$ = this.store.select(selectCourses);
      this.store.dispatch(InscriptionsActions.loadUser());
      this.store.dispatch(InscriptionsActions.loadCourse());
  }

  submitInfo(): void{
    if(this.inscriptionForm.invalid){
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscriptionsActions.createInscription({payload: this.inscriptionForm.getRawValue()}));
      this.dialogRef.close()
    }

  }
}



