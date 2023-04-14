import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, debounceTime, delay, distinctUntilChanged, share, switchMap, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  imports: [
    CommonModule,
  ],
})
export class HomePage implements AfterViewInit, OnDestroy {
  destroy$ = new Subject()
  @ViewChild('textInput')
  textInput!: ElementRef;

  data: any;
  ngOnDestroy(): void {
      this.destroy$.next(1);
      this.destroy$.complete();
  }
  ngAfterViewInit(): void {

    const input = this.textInput.nativeElement;

    const input$ = fromEvent(input, 'keyup').pipe(
      // share()
    );

    const timer$ = timer(3000);

    const inputTimeout$ = input$.pipe(
      map(e => e.target.value),
      filter(str => str.length > 2),
      distinctUntilChanged(),
      debounceTime(300),
      // switchMap(),
      // takeUntil(timer$),
      // takeUntil(this.destroy$),
    );
    
    // SUB A
    const subA = inputTimeout$.subscribe({
      next: (v) => console.log('A NEXT', v),
      error: (err) => console.log('A ERROR', err),
      complete: () => console.log('A COMPLETE')
    });
  }
}

function myTakeUntil<T>(trigger$: Observable<any>) {

  return (in$: Observable<T>) => {

    const out$ = new Observable<T>(subscriber => {
      // constructor
      const sub = in$.subscribe({
        next: (v) => subscriber.next(v),
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete(),
      });

      const sub2 = trigger$.subscribe(
        () => subscriber.complete()
      )

      // destructor
      return () => {
        sub.unsubscribe();
        sub2.unsubscribe();
      }
    });

    return out$;
  }

}
function filter<T>(filterFn: (v: T)=> boolean) {

  return (in$: Observable<T>) => {

    const out$ = new Observable<T>(subscriber => {
      // constructor
      const sub = in$.subscribe({
        next: (v) => {
          if(filterFn(v)) {
            subscriber.next(v);
          }
        },
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete(),
      });

      // destructor
      return () => {
        sub.unsubscribe();
      }
    });

    return out$;
  }

}

function map<T, R>(mapFn: (v: T)=> R) {

  return (in$: Observable<T>) => {

    const out$ = new Observable<R>(subscriber => {
      // constructor
      const sub = in$.subscribe({
        next: (v) => subscriber.next(mapFn(v)),
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete(),
      });

      // destructor
      return () => {
        console.log('MAP DESTRUCTOR');
        sub.unsubscribe();
      }
    });

    return out$;
  }

}

function timer(time: number): Observable<number> {

  return new Observable(subscriber => {
    // CONSTRUCTOR
    
    const id = setTimeout(() => {
      subscriber.next(1);
      subscriber.complete();
    }, time);

    // DESTRUCTOR => onComplete, onError, onUnsubscribe
    return () => {
      clearTimeout(id);
    }
  });
}

function fromEvent(el: any, eventName: string): Observable<any> {

  return new Observable(subscriber => {
    // CONSTRUCTOR
    console.log('CONSTRUCTOR');
    function onEvent(e: any) {
      console.log('ON EVENT');
      subscriber.next(e);
    } 
    el.addEventListener(eventName, onEvent);

    // DESTRUCTOR
    return () => {
      console.log('DESTRUCTOR');
      el.removeEventListener(eventName, onEvent)
    }
  });
}