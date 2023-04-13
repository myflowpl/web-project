import { Component, inject } from '@angular/core';
import { SongsStore } from './songs.store';

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
