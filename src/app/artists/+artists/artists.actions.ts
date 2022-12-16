import { createAction, props } from '@ngrx/store';
import { Artist } from '../../api/api.model';

export const loadArtists = createAction('[Artists] Load Artists');

export const loadArtistsSuccess = createAction(
  '[Artists] Load Artists Success',
  props<{ data: Artist[] }>()
);

export const loadArtistsFailure = createAction(
  '[Artists] Load Artists Failure',
  props<{ error: any }>()
);
