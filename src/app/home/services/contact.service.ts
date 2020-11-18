import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { Contact } from 'src/app/api/api.model';
import { API_BASE_URL } from '../../api/api.tokens';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];

  reload$ = new Subject();

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private base: string,
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.reload$.pipe(
      startWith(1),
      switchMap(() => this.http.get<Contact[]>(this.base + '/contacts')),
      tap(contacts => this.contacts = contacts),
      startWith(this.contacts.length ? this.contacts : undefined as any),
    );
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.base + '/contacts/'+id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.base + '/contacts/'+id).pipe(
      tap(() => this.reload$.next())
    );
  }

  create(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(this.base + '/contacts', contact).pipe(
      tap(() => this.reload$.next())
    );
  }
}
