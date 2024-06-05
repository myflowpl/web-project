import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { InjectionToken, PLATFORM_ID, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { StateSignal, patchState } from "@ngrx/signals";
import { EMPTY, catchError, map, pipe, tap } from "rxjs";

export const IS_SERVER = new InjectionToken<boolean>("Is Server", {
  providedIn: 'root',
  factory: () => isPlatformServer(inject(PLATFORM_ID))
});

export const IS_BROWSER = new InjectionToken<boolean>("Is Browser", {
  providedIn: 'root',
  factory: () => isPlatformBrowser(inject(PLATFORM_ID))
});

export const LOCAL_STORAGE = new InjectionToken<Storage>("localStorage", {
  providedIn: 'root',
  factory() {

      const platformId = inject(PLATFORM_ID);

      if(isPlatformBrowser(platformId)) {
        // przegladarka
        return localStorage;

      } else {
        // serwer
        return new LocalStorageMock();
      }

  },
});

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

export class LocalStorageMock implements Storage {
  
  [name: string]: any;

  private items: {[name: string]: any}  = {};

  length: number = 0;

  clear(): void {
    this.items = {};
  }
  getItem(key: string): string {
    return this.items[key];
  }
  key(index: number): string {
    const keys = Object.keys(this.items);
    return keys[index];
  }
  removeItem(key: string): void {
    delete this.items[key];
  }
  setItem(key: string, value: string): void {
    this.items[key] = value;
  }

}
