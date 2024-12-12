import { DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
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