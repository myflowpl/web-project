import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../api/api.models';
import * as AdminActions from './admin.actions';

export const adminFeatureKey = 'admin';

export interface AdminState {
  users: User[]
}

export const initialState: AdminState = {
  users: [],
};


export const reducer = createReducer(
  initialState,

  on(AdminActions.loadAdmins, state => state),
  on(AdminActions.loadAdminsSuccess, (state, action) => ({...state, users: action.data})),
  on(AdminActions.loadAdminsFailure, (state, action) => state),

);

