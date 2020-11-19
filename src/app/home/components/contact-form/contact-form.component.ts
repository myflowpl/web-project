import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Contact } from '../../../api/api.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnChanges {

  @Output()
  create = new EventEmitter<Partial<Contact>>();

  @Input()
  contact: Partial<Contact> | undefined;

  model: Partial<Contact> = {
    email: '',
    name: '',
  };

  constructor() { }

  ngOnInit(): void {
  }

  emitCreate() {
    this.create.emit(this.model);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.contact && changes.contact.currentValue) {
      this.model = {...changes.contact.currentValue}
    }
  }
  onReset() {
    this.model = {...this.contact};
  }
}
