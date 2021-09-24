import { createAction, props } from '@ngrx/store';
import { Contact } from '../../api/api.models';

export const loadContacts = createAction(
  '[Contact Page] Load Contacts'
);

export const loadContactsSuccess = createAction(
  '[Contact Effect] Load Contacts Success',
  props<{ contacts: Contact[] }>()
);

export const loadContactsFailure = createAction(
  '[Contact Effect] Load Contacts Failure',
  props<{ error: any }>()
);

// CREATE CONTACT

export const createContact = createAction(
  '[Contact Create Page] Create Contact',
  props<{ contact: Contact }>()
);

export const createContactSuccess = createAction(
  '[Contact Effect] Create Contact Success',
  props<{ contact: Contact }>()
);

export const createContactFailure = createAction(
  '[Contact Effect] Create Contact Failure',
  props<{error: any}>()
);

// UPDATE CONTACT

export const updateContact = createAction(
  '[Contact Details Page] Update Contact',
  props<{ contact: Contact }>()
);

export const updateContactSuccess = createAction(
  '[Contact Effect] Update Contact Success',
  props<{ contact: Contact }>()
);

export const updateContactFailure = createAction(
  '[Contact Effect] Update Contact Failure',
  props<{error: any}>()
);
