import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactsFeatureKey, ContactsState } from './contacts.reducer';

export const getContactsState = createFeatureSelector<ContactsState>(contactsFeatureKey);

export const getContacts = createSelector(getContactsState, (state) => state.contacts);
