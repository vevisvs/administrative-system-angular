import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscription, Inscription, InscriptionComplete } from '../models/inscription';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from '../../users/models/users';
import { Course } from '../../courses/models/course';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{data: InscriptionComplete[]}>(),
    'Load Inscriptions Failure': props<{error: HttpErrorResponse}>(),

    'Create Inscription': props<{ payload: CreateInscription}>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Inscription': props<{ id: string }>(),
    'Delete Inscription Success': props<{ id: string }>(),
    'Delete Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Load User': emptyProps(),
    'Load User Success': props<{ data: Users[] }>(),
    'Load User Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course': emptyProps(),
    'Load Course Success': props<{ data: Course[] }>(),
    'Load Course Failure': props<{ error: HttpErrorResponse }>(),

    'Load User Inscriptions': props<{ userId: string}>(),
    'Load User Inscriptions Success': props<{ inscriptions: any[] }>(),
    'Load User Inscriptions Failure': props<{ error: any }>(),
  }
});
