import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscription } from '../../models/inscription';
import { Users } from '../../../users/models/users';
import { Course } from '../../../../../core/services/course.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectCourses, selectUsers } from '../../store/inscriptions.selectors';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { InscriptionComplete } from '../../models/inscription'; //agregue esta importacion

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
      }),
      this.users$ = this.store.select(selectUsers);
      this.courses$ = this.store.select(selectCourses);
      this.store.dispatch(InscriptionsActions.loadUser());
      this.store.dispatch(InscriptionsActions.loadCourse());
  }


  submitInfo(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.users$.pipe(take(1)).subscribe(users => {
        this.courses$.pipe(take(1)).subscribe(courses => {
          const payload: InscriptionComplete = {
            ...this.inscriptionForm.getRawValue(),
            user: users,
            course: courses
          };
          this.store.dispatch(InscriptionsActions.createInscription({ payload }));
          this.dialogRef.close();
        });
      });
    }
  }
}



