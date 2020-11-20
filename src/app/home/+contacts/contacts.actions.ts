import { createAction, props } from '@ngrx/store';
import { Contact } from '../../api/api.model';

export const loadContactss = createAction(
  '[Contacts] Load Contactss'
);

export const loadContactssSuccess = createAction(
  '[Contacts] Load Contactss Success',
  props<{ data: any }>()
);

export const loadContactssFailure = createAction(
  '[Contacts] Load Contactss Failure',
  props<{ error: any }>()
);

export const create = createAction(
  '[Contacts] Create',
  props<{ contact: Partial<Contact> }>()
);

export const createSuccess = createAction(
  '[Contacts] Create Success',
  props<{ contact: Contact }>()
);

export const createFailure = createAction(
  '[Contacts] Create Failure',
  props<{ error: any }>()
);
