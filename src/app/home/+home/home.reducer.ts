import { Action, createReducer, on } from '@ngrx/store';

export const homeFeatureKey = 'home';

export interface HomeState {
  message: string;
}

export const initialState: HomeState = {
  message: 'welcome to home store',
};

export const reducer = createReducer(initialState);
