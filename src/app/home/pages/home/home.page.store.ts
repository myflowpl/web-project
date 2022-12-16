import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  catchError,
  debounceTime,
  EMPTY,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Quote, QuotesDto } from '../../../api/api.model';

export interface QuoteState {
  loading: boolean;
  error: HttpErrorResponse | null;
  search: string;
  quotes: Quote[];
  favorite: Quote[];
  selectedId: number | null;
}

@Injectable()
export class HomePageStore extends ComponentStore<QuoteState> {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);

  loading$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);
  quotes$ = this.select((state) => state.quotes);
  favorite$ = this.select((state) => state.favorite);
  // search$ = this.select(state => state.search);
  search$ = this.route.queryParams.pipe(map((params) => params['q'] || ''));

  hasQuotes$ = this.select((state) => state.quotes.length > 0);

  noQuotesFound1$ = this.select(
    (state) => !state.loading && !state.quotes.length && state.search
  );

  noQuotesFound$ = this.select(
    this.loading$,
    this.hasQuotes$,
    this.search$,
    (loading, quotes, search) => !loading && !quotes && search
  );

  readonly addFavorite = this.updater((state, quote: Quote) => {
    const exists = state.favorite.find((q) => q.id === quote.id);
    if (exists) {
      return state;
    }
    return {
      ...state,
      favorite: [quote, ...state.favorite],
    };
  });

  readonly removeFavorite = this.updater((state, quote: Quote) => {
    const favorite = state.favorite.filter((q) => q.id !== quote.id);

    return {
      ...state,
      favorite,
    };
  });

  search(searchStr: string) {
    this.router.navigate([], {
      queryParams: { q: searchStr || null },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  private readonly searchLoading = this.effect(
    (searchStr$: Observable<string>) => {
      return this.search$.pipe(
        debounceTime(250),
        tap((search) =>
          this.patchState({
            search,
            error: null,
            loading: true,
            quotes: [],
          })
        ),
        switchMap((str) =>
          this.fetchQuotes(str).pipe(
            tapResponse(
              (res) => this.patchState({ quotes: res.data, loading: false }),
              (error: HttpErrorResponse) =>
                this.patchState({ error, loading: false })
            )
          )
        )
      );
    }
  );

  private fetchQuotes(searchStr: string) {
    return this.http.get<QuotesDto>(
      `http://localhost:3333/api/quotes?q=` + searchStr
    );
  }

  constructor() {
    super({
      loading: false,
      error: null,
      search: '',
      quotes: [],
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
    };
    this.setState(newState);
  }

  searchStr$ = new Subject();
  searchStrSub = this.searchStr$.pipe(
    switchMap((str) => of({ text: 'data from server' }))
  );
  search2(searchStr: string) {
    this.searchStr$.next(searchStr);
  }
}
