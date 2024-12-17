import { Component, computed, DestroyRef, effect, inject, OnDestroy, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Contact, ContactDto, ContactResponse } from '../api/api.model';
import { ContactService } from './contact.service';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {

  titleService = inject(Title);
  contactService = inject(ContactService);

  page = signal(1);
  limit = signal(2);

  params = computed<ContactDto>(() => ({
    _page: this.page(),
    _limit: this.limit(),
  }));

  response = toSignal(toObservable(this.params).pipe(
    switchMap((params) => this.contactService.getContacts(params)),
  ), {initialValue: {contacts: [], length: 0}});

  contacts = computed(() => this.response()?.contacts );
  length = computed(() => this.response()?.length);

  title = computed(() => `Contact | page ${this.page()} | total ${this.length()}`)

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.title());
    })
  }

  handleNextPage() {
    this.page.update((page) => page+1);
  }

  handlePrevPage() {
    this.page.update((page) => page-1);
  }

}
