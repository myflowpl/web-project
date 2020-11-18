import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../../api/api.model';
import { ContactService } from '../../services/contact.service';

@Component({
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage {

  contacts$ = this.contactService.getContacts();

  constructor(
    private contactService: ContactService,
  ) { }

}
