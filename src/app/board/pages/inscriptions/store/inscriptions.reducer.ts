import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionComplete } from '../models/inscription';
import { Users } from '../../users/models/users';
import { Course } from '../../courses/models/course';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  data: InscriptionComplete[];
  user: Users[];
  course: Course[];
  error: unknown;
}

export const initialState: State = {
  data: [],
  user: [],
  course: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => {
    return {
      ...state
    }
  }),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data
    }
  }),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(InscriptionsActions.deleteInscriptionSuccess, (state, action) => {
    const newData = state.data.filter(inscription => inscription.id !== action.id);
    return {
      ...state,
      data: newData
    };
  }),
  on(InscriptionsActions.loadUser, (state) => state),
  on(InscriptionsActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.data,
    }
  }),
  on(InscriptionsActions.loadCourse, (state) => state),
  on(InscriptionsActions.loadCourseSuccess, (state, action) => {
    return {
      ...state,
      course: action.data,
    }
  })
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

