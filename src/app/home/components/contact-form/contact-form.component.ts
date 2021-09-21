import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../../../api/api.models';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnChanges {

  @Input()
  label: string = '';

  @Input()
  contact: Contact | undefined;

  @Output()
  edited = new EventEmitter<Contact>()

  form = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    this.form.patchValue(changes.contact.currentValue);
    // this.form.setValue({email: 'piotr@myfl.pl'});
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    console.log('SUBMIT', this.form.value);
    this.edited.emit(this.form.value);
  }
}
