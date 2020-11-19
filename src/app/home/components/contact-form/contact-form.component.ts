import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../../../api/api.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Output()
  create = new EventEmitter<Partial<Contact>>()

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

  onPaste(e: ClipboardEvent) {
    console.log(e)
    // console.log(e.key === 'v' && e.ctrlKey === true)
    // if(e.key === 'v' && e.ctrlKey === true) {
      e.preventDefault()
    // }
  }
}
