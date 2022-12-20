import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as PetsActions from './pets.actions';
import * as PetsFeature from './pets.reducer';

@Injectable()
export class PetsEffects {
  private actions$ = inject(Actions);

  // init$ = createEffect(() => this.actions$.pipe(
  //   ofType(PetsActions.initPets),
  //   fetch({
  //     run: (action) => {
  //       // Your custom service 'load' logic goes here. For now just return a success action...
  //       return PetsActions.loadPetsSuccess({ pets: [] });
  //     },
  //     onError: (action, error) => {
  //       console.error('Error', error);
  //       return PetsActions.loadPetsFailure({ error });
  //     }
  //   })
  // ));
}
