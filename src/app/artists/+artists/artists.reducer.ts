import { Action, createReducer, on } from '@ngrx/store';
import { Artist } from '../../api/api.model';

export const artistsFeatureKey = 'artists';

export interface ArtistsState {
  artists: Artist[];
}

export const initialState: ArtistsState = {
  artists: [],
};

export const reducer = createReducer(
  initialState,

);
