import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getContacts } from '../../+contacts/contacts.selectors';
import { Contact } from '../../../api/api.model';
import { AppState } from '../../../reducers';
import { ContactService } from '../../services/contact.service';

@Component({
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage {

  // contacts$ = this.contactService.getContacts();
  contacts$ = this.store.select(getContacts)

  constructor(
    private contactService: ContactService,
    private store: Store<AppState>,
  ) { }

}
