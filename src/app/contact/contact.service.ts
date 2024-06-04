import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../api/api.config';
import { Contact, ContactFilters } from '../api/api.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  http = inject(HttpClient);

  baseUrl = inject(BASE_URL);

  constructor() { }

  getAllContacts(params?: ContactFilters) {
    return this.http.get<Contact[]>(this.baseUrl+'/contacts', {
      params: { ... params },
    });
  }
}
