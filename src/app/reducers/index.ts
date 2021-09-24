import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromContact from '../home/+contact/contact.reducer';


export interface State {

  [fromContact.contactFeatureKey]: fromContact.ContactState;
}

export const reducers: ActionReducerMap<State> = {

  [fromContact.contactFeatureKey]: fromContact.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
