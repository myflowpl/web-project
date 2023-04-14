import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, catchError, pipe, tap } from "rxjs";

export interface State {
    loading: boolean;
}

export function tapStore<T>(store: ComponentStore<any>, nextFn: (v: T) => void) {
    return pipe(
        tap<T>({
            subscribe: () => {
                store.patchState({ 
                    loading: true,
                    error: null,
                })
            },
            finalize: () => {
                store.patchState({ loading: false })
            },
            next: nextFn
        }),
        catchError(error => {
            store.patchState({ error });
            return EMPTY;
        }),

    );
}