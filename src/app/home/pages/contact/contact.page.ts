import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/api/api.model';

@Component({
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  contacts: Contact[] = [
    {id: 1, name: 'Piotr', email: 'piotr@myflow.pl'},
    {id: 2, name: 'Paweł', email: 'pawel@myflow.pl'},
    {id: 3, name: 'Iwona', email: 'iwona@myflow.pl'},
  ];

  labelString = "Person";

  selectedId: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onContactClick(contact: Contact) {
    this.selectedId = contact.id;
  }

  handleContactDelete(contact: Contact) {
    this.contacts = this.contacts.filter(c => c !== contact)
  }

  handleContactDuplicate(contact: Contact) {
    this.contacts.push({...contact})
  }
}
