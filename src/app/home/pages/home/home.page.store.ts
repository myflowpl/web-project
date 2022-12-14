import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of, Subject, switchMap, tap } from "rxjs";
import { Quote } from "../../../api/api.model";

export interface QuoteState {
  search: string;
  quotes: Quote[];
  favorite: Quote[];
  selectedId: number | null;
}

@Injectable()
export class HomePageStore extends ComponentStore<QuoteState> {

  quotes$ = this.select(state => state.quotes);
  favorite$ = this.select(state => state.favorite);
  search$ = this.select(state => state.search);

  readonly addFavorite = this.updater((state, quote: Quote) => {
    const exists = state.favorite.find(q => q.id === quote.id)
    if(exists) {
      return state;
    }
    return {
      ...state,
      favorite: [quote, ...state.favorite],
    }
  });

  readonly removeFavorite = this.updater((state, quote: Quote) => {

    const favorite = state.favorite.filter(q => q.id !== quote.id);

    return {
      ...state,
      favorite,
    }
  });

  readonly search = this.effect((searchStr$: Observable<string>) => {
    console.log('SEARCH factory')
    return searchStr$.pipe(
      tap(search => this.patchState({search}))
    );
  });

  constructor() {
    super({
      search: '',
      quotes: [
        {id: 1, author: 'Piotr', text: 'działaj i osiągaj'},
        {id: 2, author: 'Paweł', text: 'działaj i odpoczywaj'},
      ],
      favorite: [],
      selectedId: 2,
    });
  }


  addFavoite2(quote: Quote) {
    const state = this.get();
    // WRONG - mutate state
    // state.favorite.unshift(quote);
    // this.setState(state);

    // GOOD - create new state (no mutation)
    const newState = {
      ...state,
      favorite: [quote, ...state.favorite],
    }
    this.setState(newState);
  }


  searchStr$ = new Subject();
  searchStrSub = this.searchStr$.pipe(
    switchMap(str => of({text: 'data from server'}))
  );
  search2(searchStr: string) {
    this.searchStr$.next(searchStr);
  }
}
