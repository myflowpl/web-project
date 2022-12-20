import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PETS_FEATURE_KEY, PetsState, petsAdapter } from './pets.reducer';

// Lookup the 'Pets' feature state managed by NgRx
export const selectPetsState = createFeatureSelector<PetsState>(PETS_FEATURE_KEY);

const { selectAll, selectEntities } = petsAdapter.getSelectors();

export const selectPetsLoaded = createSelector(
  selectPetsState,
  (state: PetsState) => state.loaded
);

export const selectPetsError = createSelector(
  selectPetsState,
  (state: PetsState) => state.error
);

export const selectAllPets = createSelector(
  selectPetsState,
  (state: PetsState) => selectAll(state)
);

export const selectPetsEntities = createSelector(
  selectPetsState,
  (state: PetsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectPetsState,
  (state: PetsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectPetsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
