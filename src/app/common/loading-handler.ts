import { inject, Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { tap, pipe, catchError, EMPTY, Subject, takeUntil } from "rxjs";

@Injectable()
export class LoadingHandler implements OnDestroy {

  router = inject(Router);

  active = false;
  error: any = null;

  private destroy$$ = new Subject();

  // public destroy$ = this.destroy$$.asObservable()

  tap() {
    return pipe(
      tap({
        subscribe: () => {
          this.active = true;
          this.error = null;
        },
        finalize: () => this.active = false,
        error: (err) => this.error = err,
      }),
      catchError(err => EMPTY),
      takeUntil(this.destroy$$),
    )
  }

  ngOnDestroy(): void {
    console.log('DESTROY')
    this.destroy$$.next(undefined);
    this.destroy$$.complete();
  }
}
