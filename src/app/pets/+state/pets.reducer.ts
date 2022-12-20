import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PetsActions from './pets.actions';
import { PetsEntity } from './pets.models';

export const PETS_FEATURE_KEY = 'pets';

export interface PetsState extends EntityState<PetsEntity> {
  selectedId?: string | number; // which Pets record has been selected
  loaded: boolean; // has the Pets list been loaded
  error?: string | null; // last known error (if any)
}

export interface PetsPartialState {
  readonly [PETS_FEATURE_KEY]: PetsState;
}

export const petsAdapter: EntityAdapter<PetsEntity> = createEntityAdapter<PetsEntity>();

export const initialPetsState: PetsState = petsAdapter.getInitialState({
  // set initial required properties

  loaded: false
});

const reducer = createReducer(
  initialPetsState,
  on(PetsActions.initPets,
    state => ({ ...state, loaded: false, error: null })
  ),
  on(PetsActions.loadPetsSuccess,
    (state, { pets }) => petsAdapter.setAll(pets, { ...state, loaded: true })
  ),
  on(PetsActions.loadPetsFailure,
    (state, { error }) => ({ ...state, error })
  ),
);

export function petsReducer(state: PetsState | undefined, action: Action) {
  return reducer(state, action);
}
