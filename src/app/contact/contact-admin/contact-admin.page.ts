import { Component, inject } from '@angular/core';
import { ContactStore } from '../contact.store';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.page.html',
  styleUrl: './contact-admin.page.scss',
  providers: [ ContactStore ],
})
export class ContactAdminPage {

  store = inject(ContactStore);

}
