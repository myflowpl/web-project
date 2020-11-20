import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, concatMap, exhaustMap, mergeMap, startWith } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import * as contactsActions from './contacts.actions'

@Injectable()
export class ContactsEffects {

  saveContact$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.create),
    concatMap((action) => this.contactService.create(action.contact).pipe(
      map((contact) => contactsActions.createSuccess({contact})),
      catchError(error => of(contactsActions.createFailure({error}))),
      startWith(contactsActions.createSaving())
    )),
  ));

  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.loadContactss),
    exhaustMap(() => this.contactService.getContacts().pipe(
      map((contacts) => contactsActions.loadContactssSuccess({contacts})),
      catchError(error => of(contactsActions.loadContactssFailure({error}))),
      startWith(contactsActions.loading())
    )),
  ));

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
  ) {}

}
