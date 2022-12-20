import { PetsEntity } from './pets.models';
import { petsAdapter, PetsPartialState, initialPetsState } from './pets.reducer';
import * as PetsSelectors from './pets.selectors';

describe('Pets Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPetsId = (it: PetsEntity) => it.id;
  const createPetsEntity = (id: string, name = '') => ({
    id,
    name: name || `name-${id}`
  }) as PetsEntity;

  let state: PetsPartialState;

  beforeEach(() => {
    state = {
      pets: petsAdapter.setAll([
        createPetsEntity('PRODUCT-AAA'),
        createPetsEntity('PRODUCT-BBB'),
        createPetsEntity('PRODUCT-CCC')
      ], {
        ...initialPetsState,
        selectedId : 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      })
    };
  });

  describe('Pets Selectors', () => {
    it('selectAllPets() should return the list of Pets', () => {
      const results = PetsSelectors.selectAllPets(state);
      const selId = getPetsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PetsSelectors.selectEntity(state) as PetsEntity;
      const selId = getPetsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPetsLoaded() should return the current "loaded" status', () => {
      const result = PetsSelectors.selectPetsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPetsError() should return the current "error" state', () => {
      const result = PetsSelectors.selectPetsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
