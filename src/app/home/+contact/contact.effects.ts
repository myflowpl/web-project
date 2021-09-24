import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ContactActions } from '.';
import { ContactService } from '../services/contact.service';

@Injectable()
export class ContactEffects {

  createContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactActions.createContact),
    mergeMap((action) => {
      return this.contactService.create(action.contact).pipe(
        map(contact => ContactActions.createContactSuccess({contact})),
        catchError(error => of(ContactActions.createContactFailure({error}))),
      )
    }),
  ))

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
  ) {}

}
