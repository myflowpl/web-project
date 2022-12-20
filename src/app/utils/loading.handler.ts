import { catchError, EMPTY, pipe, tap } from "rxjs";

export class LoadingHandler {

  active = false;
  error: any = null;

  tap<T>(cb?: (e: T) => void) {
    return pipe(
      tap<T>({
        subscribe: () => {
          this.active = true;
          this.error = null;
        },
        next: (e) => {
          if(cb) {
            cb(e);
          }
        },
        finalize: () => this.active = false,
        error: (error) => this.error = error,
      }),
      catchError(err => EMPTY),
    )
  }
}
