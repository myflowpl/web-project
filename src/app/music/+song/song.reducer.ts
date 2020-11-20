import { Action, createReducer, on } from '@ngrx/store';
import * as SongActions from './song.actions';

export const songFeatureKey = 'song';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(SongActions.loadSongs, state => state),
  on(SongActions.loadSongsSuccess, (state, action) => state),
  on(SongActions.loadSongsFailure, (state, action) => state),

);

