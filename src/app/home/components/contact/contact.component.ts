import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Contact } from 'src/app/api/api.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class ContactComponent implements OnInit {

  @Input()
  contact: Contact | null = null;

  @Output()
  delete = new EventEmitter<Contact>();

  @Output()
  duplicate = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void { }

  emitDelete() {
    if(this.contact) {
      this.delete.emit(this.contact);
    }
  }

  emitDuplicate() {
    if(this.contact) {
      this.duplicate.emit(this.contact);
    }
  }
}
