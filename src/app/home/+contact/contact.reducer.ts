import { Action, createReducer, on } from '@ngrx/store';
import * as ContactActions from './contact.actions';
import { Contact } from '../../api/api.models';


export const contactFeatureKey = 'contact';

export interface ContactState {
  contacts: Contact[];
  createLoading: boolean;
  error: any;
}

export const initialState: ContactState = {
  contacts: [
    {id: 1, name: 'Piotr z Ngrx', email: 'pio@co.pl'}
  ],
  createLoading: false,
  error: null,
};


export const reducer = createReducer(
  initialState,

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

