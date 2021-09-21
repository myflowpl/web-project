import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../../api/api.models';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  contacts$: Observable<Contact[]> | undefined;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.contactService.getContacts();
  }

}
