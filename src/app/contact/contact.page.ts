import { Component } from '@angular/core';
import { Contact } from '../api/api.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {

  title = 'Contact <i>Page</i>';

  decoration = '';
  isGray = false;

  selectedContact?: Contact;

  contacts: Contact[] = [
    {
      id: 1,
      name: 'Piotr',
      email: 'poi@cos.pl'
    },
    {
      id: 2,
      name: 'Pawel',
      email: 'pa@cos.pl'
    }
  ];

  handleContactClick(contact: Contact, e: Event) {
    this.selectedContact = contact;

    console.log(e);
  }
}
