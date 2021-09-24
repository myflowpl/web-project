import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { State } from "../../reducers";
import { getContacts, getCreateLoading, getError } from "./contact.selectors";

@Injectable({providedIn: 'root'})
export class ContactFacade {

  contacts$ = this.store.select(getContacts);

  createLoading$ = this.store.select(getCreateLoading);

  error$ = this.store.select(getError);

  constructor(
    private store: Store<State>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
