import { DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, EMPTY, pipe, tap } from "rxjs"

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