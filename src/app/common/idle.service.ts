import { Injectable } from '@angular/core';
import {
  Subject,
  timer,
  Observable,
  BehaviorSubject,
  Subscription
} from 'rxjs';
import {
  switchMap,
  map,
  startWith,
  takeWhile,
  shareReplay,
  endWith,
  distinctUntilChanged
} from 'rxjs/operators';

/**
 * Example:

    <span *ngIf="idleService.countdown">
      <b>Session expires in: {{idleService.countdown}}s</b>
      <button (click)="idleService.tick()">Refresh</button>
    </span>
    <span *ngIf="!idleService.isActive">
      No session <button (click)="idleService.activate()">Start</button>
    </span>
 */
@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private maxTime = 6 * 1000;
  private countdownTime = 3 * 1000;

  private sub: Subscription;
  private _tick$ = new Subject();
  /**
   * null: session active
   * 0: session inactive
   * number != 0: countdown seconds
   */
  private _countdown$ = new BehaviorSubject<number | null>(0);

  constructor() {
    const countdown$ = timer(this.maxTime - this.countdownTime, 1000).pipe(
      // timer(), starts emitting values after some time.
      map(n => this.countdownTime / 1000 - n), // convert numbers to seconds countdown
      takeWhile(sec => sec >= 0), // if it's less then zero, finish the stream
      startWith(null) // start with null in order to reset the timer value to active state (null)
    );

    this.sub = this._tick$
      .pipe(
        switchMap(() => countdown$),
        distinctUntilChanged()
      )
      .subscribe(this._countdown$);
  }

  /**
   * fire in order to keep session alive
   */
  tick() {
    this._tick$.next(undefined);
  }

  /**
   * Countdown
   *
   * null if session is valid
   * number if countdown is about to end
   * zero if countdown is done and session is dead
   */
  get countdown(): number | null {
    return this._countdown$.getValue();
  }

  get countdown$() {
    return this._countdown$.asObservable();
  }

  /**
   * if true session is valid, invalid otherwise
   */
  get isActive() {
    return this._countdown$.getValue() !== 0;
  }

  destroy() {
    this._countdown$.complete();
    this._tick$.complete();
    this.sub.unsubscribe();
  }
}
