import { Component, inject, signal } from '@angular/core';
import { Contact, ContactDto } from '../api/api.model';
import { ContactService } from './contact.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {

  contactService = inject(ContactService);

  contacts = signal<Contact[]>([]);

  length = signal(0);

  params = signal<ContactDto>({
    _page: 1,
    _limit: 2,
  });

  constructor() {
    this.contactService.getContacts().subscribe(
      res => {
        this.contacts.set(res.contacts);
        this.length.set(res.length);
      }
    )
  }

}
