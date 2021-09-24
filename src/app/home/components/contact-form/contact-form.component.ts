import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ContactFacade } from '../../+contact';
import { Contact } from '../../../api/api.models';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnChanges {

  @Input()
  label: string = 'Save';

  @Input()
  contact: Contact | undefined;

  @Output()
  edited = new EventEmitter<Contact>()

  form = this.fb.group({
    id: [],
    name: ['Test', [Validators.required]],
    email: ['test@cos.pl', [Validators.required, Validators.email]],

    address: this.fb.group({
      id: [],
      street: ['Heliego', [Validators.required]],
      city: ['Wawa', [Validators.required]],
    }),

    media: this.fb.array([])
  })

  createLoading$ = this.contactFacade.createLoading$;

  constructor(
    private fb: FormBuilder,
    private contactFacade: ContactFacade,
  ) { }

  get media() {
    return this.form.get('media') as FormArray;
  }

  addMedium() {
    this.media.push(this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
    }))
  }

  removeMedium(index: number) {
    this.media.removeAt(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data: Contact = changes.contact?.currentValue;
    if(data) {
      if(data.media) {
        data.media.forEach(() => this.addMedium())
      }
      this.form.patchValue(data);
    }
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.edited.emit(this.form.value);
  }
}
