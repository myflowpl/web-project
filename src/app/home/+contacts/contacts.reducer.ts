import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from '../../api/api.model';
import * as contactActions from './contacts.actions';

export const contactsFeatureKey = 'contacts';

export interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  saving: boolean;
}

export const initialState: ContactsState = {
  contacts: [],
  loading: false,
  saving: false,
};

export const reducer = createReducer(
  initialState,

  on(contactActions.createSuccess, (state, action) => {
    // NIE
    // state.contacts.push(action.contact);
    // return state

    // tak
    return {
      ...state,
      contacts: [
        action.contact,
        ...state.contacts
      ]
    }
  }),
  on(contactActions.createSaving, (state) => ({...state, saving: true})),
  on(contactActions.createSuccess, contactActions.createFailure, (state) => ({...state, saving: false})),

  on(contactActions.loading, (state) => ({...state, loading: true})),
  on(contactActions.loadContactssSuccess, (state, {contacts}) => ({...state, contacts})),
  on(contactActions.loadContactssSuccess, contactActions.loadContactssFailure, (state) => ({...state, loading: false})),
);

// interface Options {
//   w: number,
// }
// const data = {w: 55, label: 'string'}
// parse(data);
// function parse(o: Options) {

// }
