import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as SongActions from './song.actions';



@Injectable()
export class SongEffects {

  loadSongs$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(SongActions.loadSongs),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => SongActions.loadSongsSuccess({ data })),
          catchError(error => of(SongActions.loadSongsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
