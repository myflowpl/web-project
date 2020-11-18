import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../../api/api.model';
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
  ) { }

  ngOnInit(): void {
  }

  onCreate() {
    const contact: Partial<Contact> = {
      email: 'test@myflow.pl',
      name: 'Test'
    }
    this.contactService.create(contact).subscribe((contact: Contact) => {
      this.router.navigate(['contact', contact.id])
    })
  }
}
