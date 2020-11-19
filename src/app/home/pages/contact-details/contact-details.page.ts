import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/api/api.model';
import { ContactService } from '../../services/contact.service';
import { Observable, Subject } from 'rxjs';
import { filter, map, repeatWhen, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
  providers: [],
})
export class ContactDetailsPage implements OnInit {

  contact$: Observable<Contact>;

  isEdit = false;

  reloadId$ = new Subject();

  constructor(
    public route: ActivatedRoute,
    public contactService: ContactService,
    public router: Router,
  ) {
    this.contact$ = this.route.params.pipe(
      map(params => parseInt(params.id, 10)),
      filter(id => !!id),
      switchMap(id => this.contactService.getById(id).pipe(
        repeatWhen(() => this.reloadId$)
      )),
    );
  }

  ngOnInit(): void {}

  handleContactDelete(contact: Contact) {
    console.log(contact)
    this.contactService.delete(contact.id).subscribe(() => {
      this.router.navigate(['..'], {relativeTo: this.route})
    });
  }

  handleContactEdit(contact: Partial<Contact>) {
    console.log(contact)
    this.contactService.update(contact).subscribe(() => {
      this.isEdit = false;
      this.reloadId$.next();
    });
  }
}
