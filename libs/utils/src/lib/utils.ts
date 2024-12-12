import { isPlatformServer } from "@angular/common";
import { DestroyRef, inject, PLATFORM_ID } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ComponentStore } from "@ngrx/component-store";
import { patchState, signalMethod } from "@ngrx/signals";
import { catchError, EMPTY, map, pipe, tap } from "rxjs"

export function injectLoader() {

    const destroyRef = inject(DestroyRef);

    return {
        isLoading: false,
        error: null as any,
        tap<T>() {
            
            return pipe(
                tap<T>({
                    subscribe: () => {
                        this.isLoading = true;
                        this.error = null;
                    },
                    finalize: () => {
                        this.isLoading = false;
                    }
                }),
                catchError((error => {
                    this.error = error;
                    return EMPTY;
                })),
                takeUntilDestroyed(destroyRef),
            )
        }
    }
}

export function injectQueryParam$<T = String>(name: string, defaultValue?: T) {
    return inject(ActivatedRoute).queryParamMap.pipe(
        map(params => (params.get(name) || defaultValue || '') as T),
    );
}

export function injectQueryParam<T = String>(name: string, defaultValue?: T) {
    
    const route = inject(ActivatedRoute);

    const value$ = route.queryParamMap.pipe(
        map(params => (params.get(name) || defaultValue || '') as T),
    );

    const initialValue = (route.snapshot.queryParamMap.get(name) || defaultValue || '') as T;

    return toSignal(value$, { initialValue });
}


export interface LoadingState {
    isLoading: boolean;
    error: any;
}

export function tapStoreLoader<T>(store: ComponentStore<any>, next: (v: T) => void ) {

    return pipe(
        tap({
            subscribe: () => store.patchState({ isLoading: true, error: null }),
            next,
            error: (error) => store.patchState( { error }),
            finalize: () => store.patchState( { isLoading: false }),
        }),
        catchError(() => EMPTY),
    );
}

export function tapLoader<T>(store: any, next: (v: T) => void ) {

    return pipe(
        tap({
            subscribe: () => patchState(store, { isLoading: true, error: null }),
            next,
            error: (error) => patchState(store, { error }),
            finalize: () => patchState(store, { isLoading: false }),
        }),
        catchError(() => EMPTY),
    );
}

export function injectIsServer() {
    return isPlatformServer(inject(PLATFORM_ID));
}

export function injectUpdateTitle() {

    const titleService = inject(Title);

    const backup = titleService.getTitle();

    const destroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
        titleService.setTitle(backup);
    });

    return signalMethod((title: string) => {
        titleService.setTitle(title);
    });
}