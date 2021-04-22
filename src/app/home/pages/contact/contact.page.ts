import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../api/api.models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  color = 'green';

  title = 'Skontaktuj się z nami';

  contacts: Contact[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  changeColor() {
    this.color = 'red';
  }

  loadContacts() {
    this.contacts = [
      {id: 1, name: 'Piotr', email: 'piotr@myflow.pl'},
      {id: 2, name: 'Pawel', email: 'pawel@myflow.pl'},
    ]
  }

  handleEdit(event: Contact) {
    console.log('EDIT', event)
  }
}
