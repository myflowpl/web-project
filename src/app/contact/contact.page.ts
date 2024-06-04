import { ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnDestroy, SimpleChanges, computed, effect, inject, signal } from '@angular/core';
import { Contact } from '../api/api.model';
import { Meta, Title } from '@angular/platform-browser';
import { ContactService } from './contact.service';
import { Subscription, map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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

  id$ = this.route.queryParamMap.pipe(
    map(queryParams => queryParams.get('id') || ''),
    map(id => parseInt(id, 10) || 0)
  );
  
  contacts$ = this.contactService.getAllContacts();

  contacts = signal<Contact[]>([]);

  selectedId = toSignal(this.id$, {initialValue: 0});

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
