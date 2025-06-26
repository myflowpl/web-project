import { signal, Signal } from "@angular/core";
import { catchError, EMPTY, MonoTypeOperatorFunction, pipe, tap } from "rxjs";

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