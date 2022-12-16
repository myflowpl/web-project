import { Action, createReducer, on } from '@ngrx/store';
import { Artist } from '../../api/api.model';
import { loadArtists, loadArtistsSuccess } from './artists.actions';

export const artistsFeatureKey = 'artists';

export interface ArtistsState {
  loading: boolean;
  artists: Artist[];
}

export const initialState: ArtistsState = {
  loading: false,
  artists: [],
};

export const reducer = createReducer(
  initialState,
  on(loadArtists, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(loadArtistsSuccess, (state, action) => ({
    ...state,
    loading: false,
    artists: action.data,
  }))
);
