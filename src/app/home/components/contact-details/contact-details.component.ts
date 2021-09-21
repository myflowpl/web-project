import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../../api/api.models';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  @Input()
  contact: Contact | undefined;

  @Output()
  edit = new EventEmitter<Contact>()

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick() {
    if(this.contact) {
      this.edit.emit(this.contact);
    }
  }

}
