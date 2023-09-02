import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.State>(
  fromInscriptions.inscriptionsFeatureKey
);

export const selectInscriptions = createSelector(selectInscriptionsState, (state) => state.data)
export const selectUsers = createSelector(selectInscriptionsState, (state) => state.user)
export const selectCourses = createSelector(selectInscriptionsState, (state) => state.course)
export const selectUserInscriptions = createSelector(selectInscriptionsState, (state) => state.inscriptionByUser)
