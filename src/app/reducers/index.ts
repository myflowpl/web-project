import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromContacts from '../home/+contacts/contacts.reducer';
import * as fromRouter from '@ngrx/router-store';

export const routerFeatureKey = 'router';

export interface AppState {
  [routerFeatureKey]: fromRouter.RouterReducerState;
  [fromContacts.contactsFeatureKey]: fromContacts.ContactsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [routerFeatureKey]: fromRouter.routerReducer,
  [fromContacts.contactsFeatureKey]: fromContacts.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
