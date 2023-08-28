import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Users } from '../../users/models/users';
import { Course } from '../../courses/models/course';
import { Inscription } from '../models/inscription';
import { DATA_MOCK } from '../../inscriptions/mocks/index'

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscription: Inscription[]
}

export const initialState: State = {
  inscription: []
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, state => {
    return {
      inscription: DATA_MOCK
    }
  }),

);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

