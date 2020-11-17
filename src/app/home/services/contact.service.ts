import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/api/api.model';
import { API_BASE_URL } from '../../api/api.tokens';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private base: string,
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.base + '/contacts');
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.base + '/contacts/'+id);
  }
}
