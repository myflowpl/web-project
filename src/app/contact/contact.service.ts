import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from '../api/api.config';
import { Contact, ContactFilters } from '../api/api.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  http = inject(HttpClient);

  baseUrl = inject(BASE_URL);

  constructor() { }

  getAllContacts(params?: ContactFilters) {

    if(params?.q === 'err') {
      return throwError(() => new Error('Neidozwolony znak wpisany w szukaj'))
    }

    return this.http.get<Contact[]>(this.baseUrl+'/contacts', {
      params: { ... params },
    });
  }
}
