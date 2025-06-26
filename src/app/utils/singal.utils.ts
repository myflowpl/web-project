import { signal, Signal } from "@angular/core";
import { MonoTypeOperatorFunction, pipe, tap } from "rxjs";

export interface LoaderSignal extends Signal<boolean> {
    tap: <T>() => MonoTypeOperatorFunction<T>
}

export function loaderSignal(): LoaderSignal {

    const loader = signal(false);
    const output = loader as any as LoaderSignal;

    const tapFn = function<T>() {
        return pipe(
            tap({
                subscribe() {
                    loader.set(true);
                },
                finalize() {
                    loader.set(false);
                },
            })
        );
    } as any;


    output.tap = tapFn;

    return output;
}