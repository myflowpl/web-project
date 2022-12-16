import { isDevMode } from '@angular/core';
import {
  getSelectors,
  routerReducer,
  RouterReducerState,
} from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromHome from '../home/+home/home.reducer';

const routerFeatureKey = 'router';

export interface AppState {
  [routerFeatureKey]: RouterReducerState;
  [fromHome.homeFeatureKey]: fromHome.HomeState;
}

export const reducers: ActionReducerMap<AppState> = {
  [routerFeatureKey]: routerReducer,
  [fromHome.homeFeatureKey]: fromHome.reducer,
};

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getSelectors();

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
