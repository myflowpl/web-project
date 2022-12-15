import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromHome from '../home/+home/home.reducer';


export interface AppState {

  [fromHome.homeFeatureKey]: fromHome.HomeState;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromHome.homeFeatureKey]: fromHome.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
