import { Action, createReducer, on } from '@ngrx/store';
import { Artist } from '../../api/api.model';


export const artistFeatureKey = 'artist';

export interface MusicArtistState {
  artists: Artist[]
}

export const initialState: MusicArtistState = {
  artists: [],
};


export const reducer = createReducer(
  initialState,

);

