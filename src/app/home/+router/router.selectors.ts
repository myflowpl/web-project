import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { AppState, routerFeatureKey } from '../../reducers';

export const getRouterState = createFeatureSelector<AppState, RouterReducerState>(routerFeatureKey);

export const {
  selectQueryParam,
  selectUrl,
  selectRouteParam,
  selectRouteParams,
} = getSelectors(getRouterState)
