import { createFeatureSelector, createSelector } from '@ngrx/store';
import { artistsFeatureKey, ArtistsState } from './artists.reducer';

export const getArtistsFeature =
  createFeatureSelector<ArtistsState>(artistsFeatureKey);

export const getArtistsState = createSelector(
  getArtistsFeature,
  (state) => state
);

export const getArtists = createSelector(
  getArtistsFeature,
  (state) => state.artists
);

export const getLoading = createSelector(
  getArtistsFeature,
  (state) => state.loading
);
