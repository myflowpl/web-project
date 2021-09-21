import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../api/api.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
  ) { }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`http://localhost:3000/contacts/${id}`);
  }
}
