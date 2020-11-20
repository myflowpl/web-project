import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromArtist from '../+artist/artist.reducer';

export const musicFeatureKey = 'music';

export interface MusicState {

  [fromArtist.artistFeatureKey]: fromArtist.MusicArtistState;
}

export const reducers: ActionReducerMap<MusicState> = {

  [fromArtist.artistFeatureKey]: fromArtist.reducer,
};


export const metaReducers: MetaReducer<MusicState>[] = !environment.production ? [] : [];
