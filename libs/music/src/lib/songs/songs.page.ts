import { ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';
import { SongsStore } from './songs.store';
import { Song } from '@asseco/api-client';
import { MatSort } from '@angular/material/sort';

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

  ngOnInit(): void {
    this.store.init();
  }

  
}
