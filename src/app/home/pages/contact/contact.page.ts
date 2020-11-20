import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadContactss } from '../../+contacts/contacts.actions';
import { getContacts, getLoading } from '../../+contacts/contacts.selectors';
import { Contact } from '../../../api/api.model';
import { AppState } from '../../../reducers';
import { ContactService } from '../../services/contact.service';

@Component({
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  // contacts$ = this.contactService.getContacts();
  contacts$ = this.store.select(getContacts)
  loading$ = this.store.select(getLoading)

  constructor(
    private contactService: ContactService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadContactss())
  }

}
