import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
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

@Component({
  selector: 'app-errors',
  templateUrl: './errors.page.html',
  styleUrls: ['./errors.page.scss']
})
export class ErrorsPage implements AfterViewInit {

  @ViewChild('btn')
  button: ElementRef | undefined;

  items: any[] = [];

  ngAfterViewInit(): void {
    console.log(this.button?.nativeElement)

    const click$ = fromEvent2(this.button?.nativeElement, 'click');

    console.log('SUB A')
    const sub = click$.subscribe({
      next: (e) => {
        console.log('A NEXT', e)
      },
      error: (err) => {
        console.log('A ERROR', err)
      },
      complete: () => {
        console.log('A COMPLETE')
      }
    });
    setTimeout(() => {
      console.log('UNSUB A')
      sub.unsubscribe();
    }, 2000);
  }

  handleClick(e: MouseEvent) {
    // console.log('ng click', e)
    // this.items.unshift(e.altKey)
  }
}
