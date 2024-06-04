import { Component, EventEmitter, Input, OnChanges, Output, computed, input, model, output } from '@angular/core';
import { Contact } from '../../api/api.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {

  contact = input<Contact | null>(null);
  contactChange = output<Contact>();

  limit = model(5);

  email = computed(
    () => this.contact()?.email.substring(0, this.limit())+'...'
  )
}
