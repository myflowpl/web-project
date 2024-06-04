import { inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { StateSignal, patchState } from "@ngrx/signals";
import { EMPTY, catchError, map, pipe, tap } from "rxjs";

export function injectQueryParamNumber(name: string) {
    
    const route = inject(ActivatedRoute);

    const id$ = route.queryParamMap.pipe(
      map(queryParams => queryParams.get(name) || ''),
      map(id => parseInt(id, 10) || 0)
    );

    return toSignal(id$, {initialValue: 0});
}

export interface LoadingState extends Object {
  loading: boolean;
  error: any;
}

export function tapLoader<T>(store: StateSignal<LoadingState>, nextFn?: (v: T)=> void ) {
  return pipe(
    tap({
      next: nextFn,
      subscribe: () => {
        patchState(store, { loading: true, error: null })
      },
      finalize: () => {
        patchState(store, { loading: false })
      }
    }),
    catchError(error => {
      patchState(store, { error })
      return EMPTY;
    }),
  );
}