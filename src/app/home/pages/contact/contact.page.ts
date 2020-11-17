import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../../api/api.model';
import { ContactService } from '../../services/contact.service';

@Component({
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  sub = new Subscription();
  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    console.log('INIT Contact Page')
    const s = this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);

    this.sub.add(s);

  }

  ngOnDestroy() {
    console.log('DESTROY Contact Page')

    this.sub.unsubscribe()
  }
}
