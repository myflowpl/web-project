import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of, Subject, Subscription } from 'rxjs';
import { map, filter, share, switchMap, distinctUntilChanged, takeUntil, startWith, catchError, tap } from 'rxjs/operators';
import { ContactActions, ContactFacade } from '../../+contact';
import { Contact } from '../../../api/api.models';
import { ContactService } from '../../services/contact.service';

/**
 * zarzadzanie subskrypcja poprzez async pipe
 */
@Component({
  selector: 'app-contact-details-page',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss']
})
export class ContactDetailsPage implements OnInit {

  error: any;

  contact$ = this.contactFacade.contactById$;

  isEdit$ = this.contactFacade.isEdit$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private contactFacade: ContactFacade,
  ) {}

  ngOnInit(): void {

  }

  handleEdit(contact: Contact) {

    this.router.navigate([], {
      queryParams: {edit: 1},
      // queryParamsHandling: 'merge',
      relativeTo: this.route
    })
  }

  handleEditCancel() {

    this.router.navigate([], {
      relativeTo: this.route
    })
  }

  handleEditSubmit(contact: Contact) {

    this.contactFacade.dispatch(ContactActions.updateContact({contact}))

  }

}

/**
 * Zarządzanie subskrypcją poprzez operator switchMap & takeUntil & ngOnDestroy
 */
@Component({
  template: '',
})
export class ContactDetailsPageRxJS implements OnInit, OnDestroy {

  id: string | undefined;
  contact: Contact | undefined;
  private destroy$ = new Subject();

  public onDestroy$ = this.destroy$.asObservable();

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngOnInit(): void {

    this.route.params.pipe(
      map(params => params.id),
      filter(id => !!id),
      distinctUntilChanged(),
      switchMap(id => this.contactService.getById(id)),
      takeUntil(this.destroy$),
    ).subscribe({
      next: (contact) => this.contact = contact,
      error: () => console.log('ERR'),
      complete: () => console.log('COMPLETE'),
    })

  }

}


/**
 * Manualne zarządzanie subskrypcją
 */
@Component({template: ''})
 export class ContactDetailsPageManualSubscription implements OnInit, OnDestroy {

  id: string | undefined;
  contact: Contact | undefined;
  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
  ) { }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {

    this.route.params.pipe(
      map(params => params.id),
      filter(id => !!id)
    ).subscribe(
      id => {
        this.id = id;
        const getContact$ = this.contactService.getById(id);
        this.contact = undefined;

        this.subscription?.unsubscribe();

        this.subscription = getContact$.subscribe(contact => this.contact = contact);

        // const getContactHot$ = getContact$.pipe(share());
        // getContactHot$.subscribe();
        // getContactHot$.subscribe();
      },
      err => {},
      () => {}
    )
  }

}
