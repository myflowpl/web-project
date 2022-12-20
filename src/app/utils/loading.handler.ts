import { catchError, EMPTY, pipe, tap } from "rxjs";

export class LoadingHandler {

  private counter = 0;
  get active() {
    return this.counter > 0;
  };
  error: any = null;

  tap<T>(cb?: (e: T) => void) {
    return pipe(
      tap<T>({
        subscribe: () => {
          ++this.counter;
          this.error = null;
        },
        next: (e) => {
          if(cb) {
            cb(e);
          }
        },
        finalize: () => --this.counter,
        error: (error) => this.error = error,
      }),
      catchError(err => EMPTY),
    )
  }
}
