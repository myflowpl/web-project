import { Component, OnInit } from '@angular/core';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  template: `
    <ng-content></ng-content>
    <div class="loader-mask" *ngIf="loading"></div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
    .loader-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0, .4)
    }
  `]
})
export class LoaderComponent implements OnInit {

  // TODO dodac ngOnDestroy + przechowac subskrypcje i zrobic unsubscribe()

  loading = false;

  set add(obs: Observable<any>) {
    console.log('ADD', obs)
    if(obs) {
      this.loading = true;
      obs.pipe(
        finalize(() => this.loading = false)
      ).subscribe()
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  takeUntil() {
    //TODO
    return takeUntil(new Observable())
  }

}
