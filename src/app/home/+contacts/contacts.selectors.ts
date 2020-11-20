import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactsFeatureKey, ContactsState } from './contacts.reducer';

export const getContactsState = createFeatureSelector<ContactsState>(contactsFeatureKey);

export const getContacts = createSelector(getContactsState, (state) => state.contacts);
export const getSaving = createSelector(getContactsState, (state) => state.saving);
export const getLoading = createSelector(getContactsState, (state) => state.loading);
