import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../../api/api.models';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private reload$ = new BehaviorSubject<Contact | undefined>(undefined);

  constructor(
    private http: HttpClient,
  ) { }

  getById(id: number): Observable<Contact> {
    return this.reload$.pipe(
      switchMap(() => this.http.get<Contact>(`http://localhost:3000/contacts/${id}`))
    );
  }

  getContacts(): Observable<Contact[]> {

    return this.reload$.pipe(
      switchMap(() => this.http.get<Contact[]>(`http://localhost:3000/contacts`)),
    );

  }

  update(contact: Contact): Observable<Contact> {
    return this.http.patch<Contact>(`http://localhost:3000/contacts/${contact.id}`, contact).pipe(
      tap((contact) => this.reload$.next(contact))
    );
  }
}
