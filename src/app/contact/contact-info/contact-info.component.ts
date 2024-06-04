import { Component, Input, OnChanges, computed, input } from '@angular/core';
import { Contact } from '../../api/api.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {

  contact = input<Contact | null>(null);

  limit = input(5);

  email = computed(
    () => this.contact()?.email.substring(0, this.limit())+'...'
  )
}
