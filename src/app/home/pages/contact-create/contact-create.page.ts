import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../../api/api.models';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.page.html',
  styleUrls: ['./contact-create.page.scss']
})
export class ContactCreatePage implements OnInit {

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  handleCreateSubmit(contact: Contact) {

    this.contactService.create(contact).subscribe(newContact => {
      this.router.navigate(
        ['..', newContact.id],
        {relativeTo: this.route}
      );
    })
  }
}
