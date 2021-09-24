import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { selectQueryParam, State } from "../../reducers";
import { getContactById, getContacts, getContactsLoading, getCreateLoading, getError } from "./contact.selectors";

@Injectable({providedIn: 'root'})
export class ContactFacade {

  contacts$ = this.store.select(getContacts);

  createLoading$ = this.store.select(getCreateLoading);

  error$ = this.store.select(getError);

  contactsLoading$ = this.store.select(getContactsLoading);

  contactById$ = this.store.select(getContactById);

  isEdit$ = this.store.select(selectQueryParam('edit'));

  constructor(
    private store: Store<State>,
    public actions$: Actions
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
