import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, from, BehaviorSubject, merge } from 'rxjs';
import { startWith, switchMap, tap, take, filter } from 'rxjs/operators';
import { Contact } from 'src/app/api/api.model';
import { API_BASE_URL } from '../../api/api.tokens';

function cache<R = any, T = any>(cache$: BehaviorSubject<R>, requestFn: (val: T) => Observable<R>) {
  return (in$: Observable<T>) => {
    return merge(
      cache$,
      in$.pipe(
        startWith(1 as any),
        switchMap(requestFn),
        tap(data => cache$.next(data)),
        filter(() => false),
      )
    )
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts$ = new BehaviorSubject<Contact[]>([]);

  reload$ = new Subject();

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private base: string,
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.reload$.pipe(
      cache(this.contacts$, () => this.http.get<Contact[]>(this.base + '/contacts')),
    );
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.base + '/contacts/'+id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.base + '/contacts/'+id).pipe(
      tap(() => this.reload$.next(true))
    );
  }

  create(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(this.base + '/contacts', contact).pipe(
      tap(() => this.reload$.next(true))
    );
  }

  update(contact: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(this.base + '/contacts/'+contact.id, contact).pipe(
      tap(() => this.reload$.next(true))
    );
  }
}
