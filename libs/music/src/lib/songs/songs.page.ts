import { Component, ViewChild, inject } from '@angular/core';
import { SongsStore } from './songs.store';
import { MatSort } from '@angular/material/sort';

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

  ngOnInit(): void {
    this.store.init();
  }
}
