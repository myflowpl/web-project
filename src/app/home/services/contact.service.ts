import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Contact } from 'src/app/api/api.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [
    
  ];

  constructor() { }

  getContacts(): Observable<Contact[]> {
    return of(this.contacts);
  }

  getById(id: number): Observable<Contact> {
    const contact = this.contacts.find(c => c.id === id);
    console.log('contact', contact)
    if(contact) {
      return of(contact);
    } else {
      return throwError(new Error('Not Found'));
    }
  }
}
