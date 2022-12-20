import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PetsActions from './pets.actions';
import { PetsEffects } from './pets.effects';

describe('PetsEffects', () => {
  let actions: Observable<Action>;
  let effects: PetsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PetsEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ],
    });

    effects = TestBed.inject(PetsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PetsActions.initPets() });

      const expected = hot('-a-|', { a: PetsActions.loadPetsSuccess({ pets: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
