import { Action } from '@ngrx/store';

import * as PetsActions from './pets.actions';
import { PetsEntity } from './pets.models';
import { PetsState, initialPetsState, petsReducer } from './pets.reducer';

describe('Pets Reducer', () => {
  const createPetsEntity = (id: string, name = ''): PetsEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Pets actions', () => {
    it('loadPetsSuccess should return the list of known Pets', () => {
      const pets = [
        createPetsEntity('PRODUCT-AAA'),
        createPetsEntity('PRODUCT-zzz')
      ];
      const action = PetsActions.loadPetsSuccess({ pets });

      const result: PetsState = petsReducer(initialPetsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = petsReducer(initialPetsState, action);

      expect(result).toBe(initialPetsState);
    });
  });
});
