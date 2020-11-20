import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromContacts from '../home/+contacts/contacts.reducer';


export interface AppState {

  [fromContacts.contactsFeatureKey]: fromContacts.ContactsState;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromContacts.contactsFeatureKey]: fromContacts.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
