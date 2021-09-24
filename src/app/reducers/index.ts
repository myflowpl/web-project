import { routerReducer, RouterState, getSelectors } from '@ngrx/router-store';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromContact from '../home/+contact/contact.reducer';


export interface State {
  router: RouterState,
  [fromContact.contactFeatureKey]: fromContact.ContactState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  [fromContact.contactFeatureKey]: fromContact.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const {
  selectQueryParams,
  selectRouteParams,
  selectQueryParam,
  selectRouteParam,
} = getSelectors();
