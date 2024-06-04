import { ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';
import { Contact } from '../api/api.model';
import { Meta, Title } from '@angular/platform-browser';
import { ContactService } from './contact.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements DoCheck {

  title = 'Contact <i>Page</i>';
  decoration = '';
  isGray = false;

  metaService = inject(Meta);
  titleService = inject(Title);
  contactService = inject(ContactService);

  contacts: Contact[] = [];

  contacts$ = this.contactService.getAllContacts();

  selectedContact?: Contact;


  constructor() {

    this.contacts$.pipe(
      takeUntilDestroyed(),
    ).subscribe({
      next: contacts => this.contacts = contacts,
      error: (error) => console.log(error),
      complete: () => console.log('COMPLETE')
    });
  }


  handleContactClick(contact: Contact, e: Event) {
    this.selectedContact = contact;

    this.titleService.setTitle(contact.name);
    this.metaService.removeTag('name=description')
    this.metaService.addTag({name: 'description', content: contact.name});

    console.log(e);
  }

  ngDoCheck(): void {
      
  }
}
