import { Component, inject } from '@angular/core';
import { SongsStore } from './songs.store';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'asseco-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.css'],
  providers: [
    SongsStore,
  ],
})
export class SongsPage {
  store = inject(SongsStore);

  private fb = inject(UntypedFormBuilder);

  filtersForm = this.fb.group({
    q: [],
    year: ['', []],
  });

  ngOnInit(): void {
    this.store.init();
  }

  submitFilters() {

    let filters = Object.entries(this.filtersForm.value);

    filters = filters.filter(([_, v]) => !!v);

    this.store.filters = Object.fromEntries(filters);

  }
  
}
