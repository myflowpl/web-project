import { Component, computed, DestroyRef, effect, inject, OnDestroy, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Contact, ContactDto, ContactResponse } from '../api/api.model';
import { ContactService } from './contact.service';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  template: '',
})
export class ContactPage implements OnDestroy {

  titleService = inject(Title);

  contactService = inject(ContactService);

  contacts = signal<Contact[]>([]);

  length = signal(0);
  page = signal(1);
  limit = signal(2);

  params = computed<ContactDto>(() => ({
    _page: this.page(),
    _limit: this.limit(),
  }));

  response: Signal<ContactResponse | undefined>;

  title = computed(() => `Contact | page ${this.page()} | total ${this.length()}`)

  destroyRef = inject(DestroyRef);
  destroy$ = new Subject();

  ngOnDestroy(): void {
      this.destroy$.next(undefined);
  }

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.title());
    })

    const request$ = toObservable(this.params).pipe(
      switchMap((params) => this.contactService.getContacts(params)),
      // takeUntil(this.destroy$),
      // takeUntilDestroyed(),

    )
    // .subscribe(
    //   res => {
    //     this.contacts.set(res.contacts);
    //     this.length.set(res.length);
    //   }
    // );
    this.response = toSignal(request$);
    
    const test = signal(1);

    test.set(2);
    test.set(3);


    effect(() => console.log('TEST', test()));


    test.set(4);
  }

  handleNextPage() {
    this.page.update((page) => page+1);
  }

  handlePrevPage() {
    this.page.update((page) => page-1);
  }

}
