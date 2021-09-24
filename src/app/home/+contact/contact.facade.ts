import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { State } from "../../reducers";

@Injectable({providedIn: 'root'})
export class ContactFacade {

  contacts$ = this.store.select('contact', 'contacts');

  constructor(
    private store: Store<State>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
