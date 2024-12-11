import { pipe, tap } from "rxjs"

export function injectLoader() {

    return {
        isLoading: false,
        error: null,
        tap() {
            return pipe(
                
            )
        }
    }
}