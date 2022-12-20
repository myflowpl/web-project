import { Action, createReducer, on } from '@ngrx/store';
import { Profile } from '../auth.model';


export const authFeatureKey = 'auth';

export interface AuthState {
  profile: Profile | null;
}

export const initialState: AuthState = {
  profile: null,
};

export const reducer = createReducer(
  initialState,

);
