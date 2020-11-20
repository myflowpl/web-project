import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, concatMap, exhaustMap, mergeMap } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import * as cotactsActions from './contacts.actions'


@Injectable()
export class ContactsEffects {

  saveContact$ = createEffect(() => this.actions$.pipe(
    ofType(cotactsActions.create),
    mergeMap((action) => this.contactService.create(action.contact).pipe(
      map((contact) => cotactsActions.createSuccess({contact})),
      catchError(error => of(cotactsActions.createFailure({error}))),
    )),
  ));

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
  ) {}

}
