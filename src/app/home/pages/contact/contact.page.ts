import { Component, OnInit } from '@angular/core';
import { ContactActions } from '../../+contact';
import { ContactFacade } from '../../+contact/contact.facade';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  contacts$ = this.contactFacade.contacts$;

  contactsLoading$ = this.contactFacade.contactsLoading$;

  constructor(
    private contactFacade: ContactFacade,
  ) { }

  ngOnInit(): void {
    this.contactFacade.dispatch(ContactActions.loadContacts())
  }

}
