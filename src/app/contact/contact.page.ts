import { ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, SimpleChanges, computed, inject, signal } from '@angular/core';
import { Contact } from '../api/api.model';
import { Meta, Title } from '@angular/platform-browser';
import { ContactService } from './contact.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

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
  route = inject(ActivatedRoute);

  
  contacts$ = this.contactService.getAllContacts();

  contacts = signal<Contact[]>([]);

  selectedId = signal<number | null>(null)

  selectedContact = computed(() => {
    const contacts = this.contacts();
    const id = this.selectedId();

    return contacts.find(c => c.id === id) || null;
  });


  constructor() {

    this.contacts$.pipe(
      takeUntilDestroyed(),
    ).subscribe({
      next: contacts => this.contacts.set(contacts),
      error: (error) => console.log(error),
      complete: () => console.log('COMPLETE')
    });
  }


  handleContactClick(contact: Contact, e: Event) {
    this.selectedId.set(contact.id);

    this.titleService.setTitle(contact.name);
    this.metaService.removeTag('name=description')
    this.metaService.addTag({name: 'description', content: contact.name});

    console.log(e);
  }

  ngDoCheck(): void {
      
  }
}
