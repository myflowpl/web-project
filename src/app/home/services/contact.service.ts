import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../api/api.models';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    @Inject(API_BASE_URL)
    private baseUrl: string,
    private http: HttpClient,
  ) { }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${id}`);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
  }

  update(contact: Contact): Observable<any> {
    return this.http.patch<Contact>(`${this.baseUrl}/contacts/${contact.id}`, contact);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}/contacts`, contact);
  }
}
