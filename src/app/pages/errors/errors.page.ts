import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, exhaustMap, fromEvent, map, merge, Observable, share, Subject, switchMap, takeUntil } from 'rxjs';
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

function fromEvent2<T>(el: HasEventTargetAddRemove<T>, eventName: string) {
  return new Observable((subscriber) => {
    // constructor
    console.log('CONSTRUCTOR')

    function onEvent(e: T) {
      console.log('ON EVENT')
      subscriber.next(e);
    }
    el.addEventListener(eventName, onEvent);

    // destructor
    return () => {
      console.log('DESTRUCTOR');
      el.removeEventListener(eventName, onEvent);
    }
  });
}

function timer(time: number) {
  return new Observable<number>((subscriber) => {
    // constructor
    const id = setTimeout(() => {
      subscriber.next(1);
      subscriber.complete();
    }, time);

    // destructor
    return () => {
      clearTimeout(id);
    }
  });
}

function take<T>(count: number) {

  return (in$: Observable<T>) => {
    let nextCount = 0;

    const out$ = new Observable<T>(subscriber => {
      // constructor
      const sub = in$.subscribe({
        next: (e) => {
          subscriber.next(e);

          nextCount++;
          if(nextCount === count) {
            subscriber.complete();
          }
        },
        error: (e) => {
          subscriber.error(e);
        },
        complete: () => {
          subscriber.complete();
        },
      });

      return () => {
        sub.unsubscribe();
      }
    });

    return out$;
  }
}

function takeUntil2<T>(trigger$: Observable<unknown>) {

  return (in$: Observable<T>) => {

    const out$ = new Observable<T>(subscriber => {
      // constructor
      const sub = in$.subscribe({
        next: (e) => {
          subscriber.next(e);
        },
        error: (e) => {
          subscriber.error(e);
        },
        complete: () => {
          subscriber.complete();
        },
      });

      const subTrigger = trigger$.subscribe(() => {
        subscriber.complete();
      });

      // destructor
      return () => {
        sub.unsubscribe();
        subTrigger.unsubscribe();
      }
    });

    return out$;
  }
}

function request(searchStr: string) {
  return new Observable(subscriber => {
    // constructor
    console.log('REQ start', searchStr)
    const id = setTimeout(() => {
      console.log('REQ response', searchStr)
      subscriber.next(`Server Response for search: "${searchStr}"`);
      subscriber.complete();
    }, 3000);

    // destructor
    return () => {
      console.log('REQ canceled', searchStr)
      clearTimeout(id);
    }
  });
}

@Component({
  selector: 'app-errors',
  templateUrl: './errors.page.html',
  styleUrls: ['./errors.page.scss'],
  providers: [],
})
export class ErrorsPage implements AfterViewInit, OnDestroy {

  @ViewChild('btn')
  button: ElementRef | undefined;

  @ViewChild('search')
  input: ElementRef | undefined;

  items: any[] = [];

  destroy$ = new Subject();

  ngOnDestroy(): void {
    console.log('DESTROY')
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    console.log(this.button?.nativeElement)

    const cancel$ = merge(
      // timer(5000),
      this.destroy$,
    );

    const click$ = fromEvent2(this.input?.nativeElement, 'keyup').pipe(
      debounceTime(250),
      map((e: any) => e.target.value),
      distinctUntilChanged(),
      exhaustMap((str) => {
        console.log('switch map IN')
        return request(str)
      }),
      takeUntil(cancel$),
    );

    console.log('SUB A')
    const sub = click$.subscribe({
      next: (e) => {
        console.log('A NEXT', e)
        this.items = [e]
      },
      error: (err) => {
        console.log('A ERROR', err)
      },
      complete: () => {
        console.log('A COMPLETE')
      }
    });

    // console.log('SUB B')
    // const sub2 = click$.subscribe({
    //   next: (e) => {
    //     console.log('B NEXT', e)
    //   },
    //   error: (err) => {
    //     console.log('B ERROR', err)
    //   },
    //   complete: () => {
    //     console.log('B COMPLETE')
    //   }
    // });


    // setTimeout(() => {
    //   console.log('UNSUB A')
    //   sub.unsubscribe();
    // }, 2000);
    // setTimeout(() => {
    //   console.log('UNSUB B')
    //   sub2.unsubscribe();
    // }, 4000);
  }

  handleClick(e: MouseEvent) {
    // console.log('ng click', e)
    // this.items.unshift(e.altKey)
  }
}


// const click$ = fromEvent2(this.button?.nativeElement, 'click').pipe(
//   take(3),
//   takeUntil(cancel$),
//   switchMap((e) => {
//     console.log('switch map IN')
//     return request(e)
//   })
//   // share(),
// );
