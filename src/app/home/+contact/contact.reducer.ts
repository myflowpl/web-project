import { Action, createReducer, on } from '@ngrx/store';
import * as ContactActions from './contact.actions';
import { Contact } from '../../api/api.models';

export const contactFeatureKey = 'contact';

export interface ContactState {
  contact: Contact | null;
  contacts: Contact[];
  contactsLoading: boolean;
  createLoading: boolean;
  error: any;
}

export const initialState: ContactState = {
  contact: null,
  contacts: [],
  contactsLoading: false,
  createLoading: false,
  error: null,
};


export const reducer = createReducer(
  initialState,

  on(ContactActions.loadContacts, (state) => ({
    ...state,
    contactsLoading: true,
    error: null,
  })),

  on(ContactActions.loadContactsSuccess, (state, {contacts}) => ({
    ...state,
    contacts,
    contactsLoading: false,
    error: null,
  })),

  on(ContactActions.loadContactsFailure, (state, {error}) => ({
    ...state,
    contactsLoading: false,
    error,
  })),

  on(ContactActions.createContact, (state) => ({
    ...state,
    createLoading: true,
    error: null,
  })),

  on(ContactActions.createContactSuccess, (state, action) => {
    return {
      ...state,
      createLoading: false,
      contacts: [
        ...state.contacts,
        action.contact,
      ]
    }
  }),

  on(ContactActions.createContactFailure, (state, action) => ({
    ...state,
    createLoading: false,
    error: action.error
  })),

);

