import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactsFeatureKey, ContactsState } from './contacts.reducer';
import { selectRouteParam } from '../+router/router.selectors';

export const getContactsState = createFeatureSelector<ContactsState>(contactsFeatureKey);

export const getContacts = createSelector(getContactsState, (state) => state.contacts);
export const getSaving = createSelector(getContactsState, (state) => state.saving);
export const getLoading = createSelector(getContactsState, (state) => state.loading);


export const getContactByRouteParam = createSelector(
  getContacts,
  selectRouteParam('id'),
  (contacts, id) => contacts.find(c => id ? c.id === parseInt(id, 10) : null)
);
