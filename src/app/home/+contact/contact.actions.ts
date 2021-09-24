import { createAction, props } from '@ngrx/store';
import { Contact } from '../../api/api.models';

export const loadContacts = createAction(
  '[Contact] Load Contacts'
);

export const loadContactsSuccess = createAction(
  '[Contact] Load Contacts Success',
  props<{ data: any }>()
);

export const loadContactsFailure = createAction(
  '[Contact] Load Contacts Failure',
  props<{ error: any }>()
);

// CREATE CONTACT

export const createContact = createAction(
  '[Contact Create Page] Create Contact',
  props<{ contact: Contact }>()
);
