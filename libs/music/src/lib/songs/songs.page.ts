import { ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';
import { SongsStore } from './songs.store';
import { Song } from '@asseco/api-client';
import { MatSort } from '@angular/material/sort';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'asseco-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SongsStore,
  ],
})
export class SongsPage {
  store = inject(SongsStore);

  rows = 4;

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
