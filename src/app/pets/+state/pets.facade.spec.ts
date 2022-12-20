import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as PetsActions from './pets.actions';
import { PetsEffects } from './pets.effects';
import { PetsFacade } from './pets.facade';
import { PetsEntity } from './pets.models';
import {
  PETS_FEATURE_KEY,
  PetsState,
  initialPetsState,
  petsReducer
} from './pets.reducer';
import * as PetsSelectors from './pets.selectors';

interface TestSchema {
  pets: PetsState;
}

describe('PetsFacade', () => {
  let facade: PetsFacade;
  let store: Store<TestSchema>;
  const createPetsEntity = (id: string, name = ''): PetsEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PETS_FEATURE_KEY, petsReducer),
          EffectsModule.forFeature([PetsEffects])
        ],
        providers: [PetsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(PetsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allPets$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allPets$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadPetsSuccess` to manually update list
     */
    it('allPets$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allPets$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(PetsActions.loadPetsSuccess({
        pets: [
          createPetsEntity('AAA'),
          createPetsEntity('BBB')
        ]})
      );

      list = await readFirst(facade.allPets$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
