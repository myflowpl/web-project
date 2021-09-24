import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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

    // this.loader.add = this.contactService.create(contact).pipe(
    //   tap(newContact => {
    //     this.router.navigate(
    //       ['..', newContact.id],
    //       {relativeTo: this.route}
    //     );
    //   })
    // )
  }

  handleCreateSubmitWithCancel(contact: Contact) {

    this.contactService.create(contact).pipe(
      this.loader.takeUntil(),
      tap((newContact: any) => {
        this.router.navigate(
          ['..', newContact.id],
          {relativeTo: this.route}
        );
      })
    )
  }
}
