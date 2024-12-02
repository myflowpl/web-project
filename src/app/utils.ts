import { DestroyRef, inject, Signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, EMPTY, map, Observable, tap } from "rxjs";
import { patchState, StateSignals } from "@ngrx/signals";
import { Meta, Title } from "@angular/platform-browser";
import { signalMethod } from "./utils/signal-method";


export function injectQueryParam<T = String>(name: string, defaultValue = ''): Signal<T> {

    const route = inject(ActivatedRoute);

    const initialValue = route.snapshot.queryParamMap.get(name) || defaultValue;

    const param = toSignal(route.queryParamMap.pipe(
        map(params => params.get(name) || defaultValue),
    ), { initialValue });

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
                    patchState(store, {isLoading: true, error: null})
                },
                finalize() {
                    patchState(store, {isLoading: false})
                },
            }),
            catchError(error => {
                patchState(store, { error })
                return EMPTY;
            }),
        );
    }
}

export function injectUpdateTitle() {

    const titleService = inject(Title);
    const metaService = inject(Meta);

    const destroyRef = inject(DestroyRef);

    const backup = titleService.getTitle();

    destroyRef.onDestroy(() => {
        titleService.setTitle(backup);
    })

    return signalMethod((title: string) => {
        titleService.setTitle(title);
        metaService.updateTag({property: 'og:title', content: title});
    });
}