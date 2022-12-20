import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pet, PetApi } from '../../../api-client';

import * as PetsActions from './pets.actions';
import * as PetsFeature from './pets.reducer';

@Injectable()
export class PetsEffects {
  private actions$ = inject(Actions);
  private petApi = inject(PetApi);

  init$ = createEffect(() => {

    return this.actions$.pipe(
      ofType(PetsActions.initPets),
      switchMap((action) => {
        return this.petApi.findPetsByStatus({status: [Pet.StatusEnum.Pending]}).pipe(
          map(pets => PetsActions.loadPetsSuccess({pets})),
          catchError(error => of(PetsActions.loadPetsFailure({error})))
        )
      }),
    );

  });

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
