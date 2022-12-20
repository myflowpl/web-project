import { createAction, props } from '@ngrx/store';
import { PetsEntity } from './pets.models';

export const initPets = createAction(
  '[Pets Page] Init'
);

export const loadPetsSuccess = createAction(
  '[Pets/API] Load Pets Success',
  props<{ pets: PetsEntity[] }>()
);
export const loadPetsOwnersSuccess = createAction(
  '[Pets/API] Load Pets Owners Success',
  props<{ pets: PetsEntity[] }>()
);

export const loadPetsFailure = createAction(
  '[Pets/API] Load Pets Failure',
  props<{ error: any }>()
);

export const select = createAction(
  '[Pets/API] Select pet',
  props<{ pet: PetsEntity }>()
);
