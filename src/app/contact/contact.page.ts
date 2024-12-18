import { Component, computed, DestroyRef, effect, inject, OnDestroy, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Contact, ContactDto, ContactResponse } from '../api/api.model';
import { ContactService } from './contact.service';
import { BehaviorSubject, catchError, combineLatest, EMPTY, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { loaderSignal } from '../utils/signal.utils';
import { injectUpdateTitle } from '../utils/title.utils';
import { logoutWatchDog } from '../auth/logout.watchdog';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage {
  logoutWatchDog = logoutWatchDog();

  canDeactivate = false;

  updateTitle = injectUpdateTitle();
  contactService = inject(ContactService);

  reload$ = new BehaviorSubject(true)

  page = signal(1);
  limit = signal(2);

  params = computed<ContactDto>(() => ({
    _page: this.page(),
    _limit: this.limit(),
  }));

  loader = loaderSignal();

  response = toSignal(
    combineLatest([toObservable(this.params), this.reload$]
  ).pipe(
    switchMap(
      ([params]) => this.contactService.getContacts(params).pipe(
        this.loader.tap(),
      )
    ),
  ), {initialValue: {contacts: [], length: 0}});

  contacts = computed(() => this.response()?.contacts );
  length = computed(() => this.response()?.length);

  title = computed(() => `Contact | page ${this.page()} | total ${this.length()}`)

  constructor() {
    effect(() => {
      this.updateTitle(this.title());
    })
  }

  handleNextPage() {
    this.page.update((page) => page+1);
  }

  handlePrevPage() {
    this.page.update((page) => page-1);
  }

}
