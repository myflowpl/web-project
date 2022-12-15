import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { loadArtists, loadArtistsSuccess } from './artists.actions';



@Injectable()
export class ArtistsEffects {

  loadArtists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadArtists),
      switchMap(action => of(loadArtistsSuccess({
        data: [{id: 1, img: '', name: ''}]
      }))),
    );
  });

  constructor(private actions$: Actions) {}
}
