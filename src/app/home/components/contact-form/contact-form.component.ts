import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../../api/api.models';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input()
  contact: Contact | undefined;

  @Output()
  edited = new EventEmitter<Contact>()

  constructor() { }

  ngOnInit(): void {
  }

}
