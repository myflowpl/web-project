import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private top$$ = new BehaviorSubject<TemplateRef<any>[]>([]);

  public top$: Observable<TemplateRef<any> | null> = this.top$$.asObservable().pipe(
    map(templates => templates[templates.length-1]),
    distinctUntilChanged(),
  );

  private bottom$$ = new BehaviorSubject<TemplateRef<any>[]>([]);

  public bottom$: Observable<TemplateRef<any> | null> = this.bottom$$.asObservable().pipe(
    map(templates => templates[templates.length-1]),
    distinctUntilChanged(),
  );

  addTop(tpl: TemplateRef<any>) {
    this.top$$.next([
      ...this.top$$.getValue(),
      tpl
    ])
  }

  removeTop(tpl: TemplateRef<any>) {
    this.top$$.next(
      this.top$$.getValue().filter(t => t !== tpl)
    )
  }

  addBottom(tpl: TemplateRef<any>) {
    this.bottom$$.next([
      ...this.bottom$$.getValue(),
      tpl
    ])
  }

  removeBottom(tpl: TemplateRef<any>) {
    this.bottom$$.next(
      this.bottom$$.getValue().filter(t => t !== tpl)
    )
  }
}
