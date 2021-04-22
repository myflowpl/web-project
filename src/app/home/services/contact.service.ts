import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Contact } from '../../api/api.models';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../api/api.config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,

    @Inject(BASE_URL)
    private baseUrl: string,
    ) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl + '/contacts');
  }
}
