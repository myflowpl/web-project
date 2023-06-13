import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss']
})
export class QuotesPage implements AfterViewInit {

  http = inject(HttpClient);

  destroy$ = new Subject();

  show = true;

  @ViewChild('inputElement')
  input?: ElementRef;

  data$?: Observable<any>;

  ngAfterViewInit(): void {

    function fromEvent(el: any, eventName: string): Observable<any> {
      return new Observable(subscriber => {
        // CONSTRUCTOR
        console.log('CONSTRUCTOR');

        function onEvent(e: any) {
          console.log('ON EVENT', e.target.value);
          subscriber.next(e);
        }
        
        el.addEventListener(eventName, onEvent);

        return () => {
          console.log('DESTRUCTOR');
          el.removeEventListener(eventName, onEvent);
        }
      });
    }
    
    const keyup$ = fromEvent(this.input?.nativeElement, 'keyup');

    this.data$ = keyup$.pipe(
      map(e => e.target.value),
      filter(str => str.length >= 2 ),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap(str => this.search(str).pipe(
        takeUntil(this.destroy$),
      )),
    );

  }

  search(q: string) {
    return this.http.get('http://localhost:3000/artists', { params: { q } })
  }

  onCancel() {
    this.destroy$.next(true);
  }

  onKeyUp(e: Event) {
    // todo handle key up event
  }
}
