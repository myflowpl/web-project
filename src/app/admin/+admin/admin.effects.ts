import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AdminActions from './admin.actions';
import { AdminService } from '../admin.service';



@Injectable()
export class AdminEffects {

  loadAdmins$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AdminActions.loadAdmins),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.adminService.getUsers().pipe(
          map(data => AdminActions.loadAdminsSuccess({ data })),
          catchError(error => of(AdminActions.loadAdminsFailure({ error }))))
      )
    );
  });



  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}

}
