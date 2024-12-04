import { DestroyRef, inject, InjectionToken, PLATFORM_ID, REQUEST, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { patchState, StateSignals } from '@ngrx/signals';
import { Meta, Title } from '@angular/platform-browser';
import { signalMethod } from './utils/signal-method';
import { isPlatformServer } from '@angular/common';

export function injectQueryParam<T = String>(
  name: string,
  defaultValue = ''
): Signal<T> {
  const route = inject(ActivatedRoute);

  const initialValue = route.snapshot.queryParamMap.get(name) || defaultValue;

  const param = toSignal(
    route.queryParamMap.pipe(map((params) => params.get(name) || defaultValue)),
    { initialValue }
  );

  return param as Signal<T>;
}

export interface LoadingState {
  loading: boolean;
  error: any;
}

//TODO StateSignals<LoadingState>
export function tapLoader<T>(store: any, nextFn?: (v: T) => void) {
  return (in$: Observable<T>) => {
    return in$.pipe(
      tap({
        next: nextFn,
        subscribe() {
          patchState(store, { isLoading: true, error: null });
        },
        finalize() {
          patchState(store, { isLoading: false });
        },
      }),
      catchError((error) => {
        patchState(store, { error });
        return EMPTY;
      })
    );
  };
}

export function injectUpdateTitle() {
  const titleService = inject(Title);
  const metaService = inject(Meta);

  const destroyRef = inject(DestroyRef);

  const backup = titleService.getTitle();

  destroyRef.onDestroy(() => {
    titleService.setTitle(backup);
  });

  return signalMethod((title: string) => {
    titleService.setTitle(title);
    metaService.updateTag({ property: 'og:title', content: title });
  });
}


// SSR helpers

export function injectIsServer(): boolean {
  const id = inject(PLATFORM_ID)
  // return id;
  return isPlatformServer(id);
}

export function injectWindow(): Window | undefined {
  const id = inject(PLATFORM_ID)
  return isPlatformServer(id) ? undefined : window;
}

export class LocalStorageMock implements Storage {
  
  [name: string]: any;

  private items: any  = {} as any;

  length: number = 0;

  clear(): void {
    this.items = {} as any;
  }
  getItem(key: string): string | null {
    return this.items[key];
  }
  key(index: number): string | null {
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

export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory() {
    const id = inject(PLATFORM_ID)
    return isPlatformServer(id) ? new LocalStorageMock() : localStorage;
  },
});

export function injectLocalStorage(): Storage {
  return inject(LOCAL_STORAGE);
}


export const DOMAIN = new InjectionToken<string>('DOMAIN', {
  providedIn: 'root',
  factory() {
    const window = injectWindow();
    const request = inject(REQUEST);
    // console.log('REQUEST', request);
    if(window) {
      return window.location.origin;
    } else {
      // TO REMEBER docker container
      // const host = (request.headers['x-forwarded-host'] || request.headers['host'] || '') as string;
      // let proto = request.headers['x-forwarded-proto'] as string;

      return request?.headers.get('proto') + '://' + request?.headers.get('host');
    }
  },
});