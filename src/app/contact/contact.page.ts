import { ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, SimpleChanges, computed, effect, inject, signal } from '@angular/core';
import { Contact } from '../api/api.model';
import { Meta, Title } from '@angular/platform-browser';
import { ContactService } from './contact.service';
import { Subscription, map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { injectQueryParamNumber } from '../injection.utils';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss',
})
export class ContactPage implements DoCheck {

  title = 'Contact <i>Page</i>';
  decoration = '';
  isGray = false;

  metaService = inject(Meta);
  titleService = inject(Title);
  contactService = inject(ContactService);

  selectedId = injectQueryParamNumber('id');
  
  contacts = toSignal(
    this.contactService.getAllContacts(), 
    {initialValue: []}
  );

  selectedContact = computed(() => {
    const contacts = this.contacts();
    const id = this.selectedId();

    return contacts.find(c => c.id === id) || null;
  });


  constructor() {

    effect(() => {
      const contact = this.selectedContact();

      this.metaService.removeTag('name=description')
      this.titleService.setTitle('Web Project');
      
      if(contact) {
        this.titleService.setTitle(contact.name);
        this.metaService.addTag({name: 'description', content: contact.name});
      }
  
    });
  }

  ngDoCheck(): void {
      
  }
}
