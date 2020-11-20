import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { create } from '../../+contacts/contacts.actions';
import { Contact } from '../../../api/api.model';
import { AppState } from '../../../reducers';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.page.html',
  styleUrls: ['./contact-create.page.scss']
})
export class ContactCreatePage implements OnInit {

  constructor(
    private contactService: ContactService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onCreate(contact: Partial<Contact>) {

    this.store.dispatch(create({contact}));

    // this.contactService.create(contact).subscribe((contact: Contact) => {
    //   this.router.navigate(['contact', contact.id])
    // })
  }
}
