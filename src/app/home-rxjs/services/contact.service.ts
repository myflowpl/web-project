import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Contact } from '../../api/api.models';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private reload$ = new BehaviorSubject<Contact | undefined>(undefined);

  constructor(
    @Inject(API_BASE_URL)
    private baseUrl: string,
    private http: HttpClient,
  ) { }

  getById(id: number): Observable<Contact> {
    return this.reload$.pipe(
      switchMap(() => this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`))
    );
  }

  getContacts(): Observable<Contact[]> {

    return this.reload$.pipe(
      switchMap(() => this.http.get<Contact[]>(`${this.baseUrl}/contacts`)),
    );

  }

  update(contact: Contact): Observable<any> {
    return this.http.patch<Contact>(`${this.baseUrl}/contacts/${contact.id}`, contact).pipe(
      tap((contact) => this.reload$.next(contact)),
    );
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}/contacts`, contact).pipe(
      tap((contact) => this.reload$.next(contact))
    );
  }
}
