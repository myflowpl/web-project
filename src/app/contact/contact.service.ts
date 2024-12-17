import { inject, Injectable } from '@angular/core';
import { injectConfig } from '../app.tokens';
import { HttpClient } from '@angular/common/http';
import { Contact, ContactDto, ContactResponse } from '../api/api.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = injectConfig().baseUrl;
  http = inject(HttpClient);

  getContacts(params?: ContactDto): Observable<ContactResponse> {

    return this.http.get<Contact[]>(this.baseUrl+'/contacts', {
      params: {...params},
      observe: 'response'
    }).pipe(
      map(res => ({
        contacts: res.body || [],
        length: parseInt(res.headers.get('x-total-count') || '0'),
      }))
    )
  }
}
