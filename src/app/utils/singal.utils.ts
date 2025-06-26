import { DestroyRef, inject, signal, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { catchError, EMPTY, map, MonoTypeOperatorFunction, pipe, tap } from "rxjs";

export interface LoaderSignal extends Signal<boolean> {
    tap: <T>() => MonoTypeOperatorFunction<T>;
    error: Signal<any>
}

export function loaderSignal(): LoaderSignal {

    const loader = signal(false);
    const output = loader as any as LoaderSignal;
    const error = signal(null);

    const tapFn = function<T>() {
        return pipe(
            tap({
                subscribe() {
                    loader.set(true);
                    error.set(null);
                },
                finalize() {
                    loader.set(false);
                },
                error(err) {
                    error.set(err);
                },
            }),
            catchError(() => EMPTY)
        );
    } as any;


    output.tap = tapFn;
    output.error = error;

    return output;
}

export function injectParamAsNumber(name: string, initialValue = 0) {

    const   route = inject(ActivatedRoute);

    const value$ = route.params.pipe(
        map(params => params[name]),
        map(param => parseInt(param, 10))
    );

    return toSignal(value$, { initialValue })
}

export function injectTitleService() {

    const titleService = inject(Title);
    const metaService = inject(Meta);
    
    const backup = titleService.getTitle();
    const destroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => titleService.setTitle(backup))

    return {
        setTitle(title: string) {
            titleService.setTitle(title);
        }
    }
}