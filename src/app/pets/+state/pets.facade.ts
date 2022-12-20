import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as PetsActions from './pets.actions';
import * as PetsFeature from './pets.reducer';
import * as PetsSelectors from './pets.selectors';

@Injectable()
export class PetsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(PetsSelectors.selectPetsLoaded));
  allPets$ = this.store.pipe(select(PetsSelectors.selectAllPets));
  selectedPets$ = this.store.pipe(select(PetsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(PetsActions.initPets());
  }
}
