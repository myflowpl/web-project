import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/api/api.model';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
  providers: [],
})
export class ContactDetailsPage implements OnInit {

  contact$: Observable<Contact>;

  constructor(
    public route: ActivatedRoute,
    public contactService: ContactService,
  ) {
    this.contact$ = this.route.params.pipe(
      map(params => parseInt(params.id, 10)),
      filter(id => !!id),
      switchMap(id => this.contactService.getById(id)),
    );
  }

  ngOnInit(): void {}

  handleContactDelete(contact: Contact) {
    console.log(contact)
  }

  handleContactEdit(contact: Contact) {
    console.log(contact)
  }
}
