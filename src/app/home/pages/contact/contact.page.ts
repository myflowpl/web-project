import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { Contact } from '../../../api/api.models';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit, OnDestroy {
  color = 'green';
  title = 'Skontaktuj się z nami';
  // contacts: Contact[] = [];

  contacts$ = this.contactService.getContacts().pipe(
    // share()
  );

  // sub: Subscription | null = null;

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    // this.sub = this.contactService.getContacts()
    //   .subscribe(contacts => this.contacts = contacts);
  }
  ngOnDestroy() {
    // this.sub?.unsubscribe()
  }
  changeColor() {
    this.color = 'red';
  }

  loadContacts() {
    // this.contacts = [
    //   {id: 1, name: 'Piotr', email: 'piotr@myflow.pl'},
    //   {id: 2, name: 'Pawel', email: 'pawel@myflow.pl'},
    // ]
  }

  handleEdit(event: Contact) {
    console.log('EDIT', event)
  }
}
