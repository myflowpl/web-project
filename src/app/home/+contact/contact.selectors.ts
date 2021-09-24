import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contactFeatureKey, ContactState } from './contact.reducer';

export const getContactState = createFeatureSelector<ContactState>(contactFeatureKey);

export const getContacts = createSelector(
  getContactState,
  (contactState) => contactState.contacts
);

export const getCreateLoading = createSelector(
  getContactState,
  (contactState) => contactState.createLoading
);

export const getError = createSelector(
  getContactState,
  (contactState) => contactState.error
);

export const getContactsLoading = createSelector(
  getContactState,
  (contactState) => contactState.contactsLoading
);
