import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { take, takeUntil, tap } from 'rxjs/operators';
import { ContactActions, ContactFacade } from '../../+contact';
import { Contact } from '../../../api/api.models';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.page.html',
  styleUrls: ['./contact-create.page.scss']
})
export class ContactCreatePage implements OnInit {

  @ViewChild('loaderRef')
  loader!: LoaderComponent;

  createLoading$ = this.contactFacade.createLoading$

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private contactFacade: ContactFacade,
  ) { }

  ngOnInit(): void {
  }

  handleCreateSubmit(contact: Contact) {

    this.contactFacade.dispatch(ContactActions.createContact({contact}))

    this.contactFacade.actions$.pipe(
      ofType(ContactActions.createContactSuccess),
      take(1),
      takeUntil(this.contactFacade.actions$.pipe(ofType(ContactActions.createContactFailure)))
    ).subscribe(({contact}) => {
      this.router.navigate(
        ['..', contact.id],
        {relativeTo: this.route}
      );
    })

  }
}
