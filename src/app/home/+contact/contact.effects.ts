import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ContactActions } from '.';
import { ContactService } from '../services/contact.service';

@Injectable()
export class ContactEffects {

  // save new contact
  createContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactActions.createContact),
    mergeMap((action) => {
      return this.contactService.create(action.contact).pipe(
        map(contact => ContactActions.createContactSuccess({contact})),
        catchError(error => of(ContactActions.createContactFailure({error}))),
      )
    }),
  ))

  // redirect after create success
  // createContactSuccess$ = createEffect(() => this.actions$.pipe(
  //   ofType(ContactActions.createContactSuccess),
  //   tap(({contact}) => {
  //     this.router.navigate(
  //       ['contact', contact.id],
  //       {relativeTo: this.route}
  //     );
  //   })
  // ), {dispatch: false});

  // save updated contact
  updateContact$ = createEffect(() => this.actions$.pipe(
    ofType(ContactActions.updateContact),
    mergeMap((action) => {
      return this.contactService.update(action.contact).pipe(
        map(contact => {
          this.router.navigate([], {
            relativeTo: this.route
          })
          return ContactActions.updateContactSuccess({contact})
      }),
        catchError(error => of(ContactActions.updateContactFailure({error}))),
      )
    }),
  ))

  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(ContactActions.loadContacts),
    switchMap((action) => {
      return this.contactService.getContacts().pipe(
        map(contacts => ContactActions.loadContactsSuccess({contacts})),
        catchError(error => of(ContactActions.loadContactsFailure({error}))),
      )
    }),
  ))

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

}
