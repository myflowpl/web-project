import { signal, Signal } from "@angular/core";
import { catchError, EMPTY, MonoTypeOperatorFunction, OperatorFunction, pipe, tap, UnaryFunction } from "rxjs";

export interface LoaderSignal extends Signal<boolean> {
    error: Signal<any>;
    tap: <T>() => MonoTypeOperatorFunction<T>
}

export function loaderSignal(): LoaderSignal {

    const loader = signal(false);
    const error = signal(null);

    const tapFn = function<T, A>() {
        return pipe(
            tap<T>({
                subscribe: () => {
                    loader.set(true);
                    error.set(null);
                },
                error: (err) => {
                    error.set(err);
                },
                finalize: () => {
                    loader.set(false);
                },
            }),
            catchError((error) => EMPTY),
        );
    } as any;

    const output = loader as any as LoaderSignal;

    output.error = error.asReadonly();

    output.tap = tapFn;

    return output;
}