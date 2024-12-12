import { isPlatformServer } from "@angular/common";
import { DestroyRef, inject, PLATFORM_ID } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { ComponentStore } from "@ngrx/component-store";
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

export function injectIsServer() {
    return isPlatformServer(inject(PLATFORM_ID));
}