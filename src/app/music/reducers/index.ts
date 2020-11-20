import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromArtist from '../+artist/artist.reducer';
import * as fromSong from '../+song/song.reducer';

export const musicFeatureKey = 'music';

export interface MusicState {

  [fromArtist.artistFeatureKey]: fromArtist.MusicArtistState;
  [fromSong.songFeatureKey]: fromSong.State;
}

export const reducers: ActionReducerMap<MusicState> = {

  [fromArtist.artistFeatureKey]: fromArtist.reducer,
  [fromSong.songFeatureKey]: fromSong.reducer,
};


export const metaReducers: MetaReducer<MusicState>[] = !environment.production ? [] : [];
