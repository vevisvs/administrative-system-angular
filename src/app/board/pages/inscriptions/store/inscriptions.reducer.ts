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
  inscriptionByUser: InscriptionComplete[];
}

export const initialState: State = {
  data: [],
  user: [],
  course: [],
  error: null,
  inscriptionByUser: [],
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
  }),
  on(InscriptionsActions.loadUserInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      inscriptionByUser: action.inscriptions,
      error: null,
    };
  }),
  on(InscriptionsActions.loadUserInscriptionsFailure, (state, action) => {
    return {
      ...state,
      inscriptionByUser: [],
      error: action.error,
    };
  }),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

