import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from '../../api/api.models';


export const contactFeatureKey = 'contact';

export interface ContactState {
  contacts: Contact[];
}

export const initialState: ContactState = {
  contacts: [
    {id: 1, name: 'Piotr z Ngrx', email: 'pio@co.pl'}
  ],
};


export const reducer = createReducer(
  initialState,

);

