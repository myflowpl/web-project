import { Component, OnInit, inject } from '@angular/core';
import { ContactStore } from '../contact.store';
import { FormBuilder } from '@angular/forms';
import { ContactFilters } from '../../api/api.model';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.page.html',
  styleUrl: './contact-admin.page.scss',
  providers: [ ContactStore ],
})
export class ContactAdminPage implements OnInit {

  store = inject(ContactStore);

  fb = inject(FormBuilder);

  form = this.fb.group({
    q: ['', [], []],
    _page: [1, [], []],
    _limit: [2, [], []],
  });

  ngOnInit() {

    this.store.loadContacts(this.form.value as ContactFilters);
  }

  onSubmit() {

    this.store.setFilters(this.form.value as ContactFilters);
    this.store.setFilters(this.form.value as ContactFilters);
    this.store.setFilters(this.form.value as ContactFilters);

    this.store.loadContacts(this.form.value as ContactFilters);
  }

}
