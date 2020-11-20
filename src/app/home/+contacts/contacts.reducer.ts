import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from '../../api/api.model';
import * as contactActions from './contacts.actions';

export const contactsFeatureKey = 'contacts';

export interface ContactsState {
  contacts: Contact[]
}

export const initialState: ContactsState = {
  contacts: [],
};

export const reducer = createReducer(
  initialState,

  on(contactActions.create, (state, action) => {
    // NIE
    // state.contacts.push(action.contact);
    // return state

    // tak
    return {
      ...state,
      contacts: [
        action.contact as any,
        ...state.contacts
      ]
    }
  }),
);

