import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArtistsService } from '../services/artists.service';
import {
  loadArtists,
  loadArtistsFailure,
  loadArtistsSuccess,
} from './artists.actions';

@Injectable()
export class ArtistsEffects {
  artistsService = inject(ArtistsService);

  loadArtists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadArtists),
      switchMap((action) =>
        this.artistsService.getArtists().pipe(
          map((artists) => loadArtistsSuccess({ data: artists })),
          catchError((error) => of(loadArtistsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
