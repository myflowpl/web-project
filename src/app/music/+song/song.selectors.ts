import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSong from './song.reducer';

export const selectSongState = createFeatureSelector<fromSong.State>(
  fromSong.songFeatureKey
);
