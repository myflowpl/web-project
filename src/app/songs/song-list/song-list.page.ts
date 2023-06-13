import { Component, OnInit, inject } from '@angular/core';
import { SongsStore } from './songs.store';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.page.html',
  styleUrls: ['./song-list.page.scss'],
  providers: [ SongsStore ],
})
export class SongListPage implements OnInit {

  songsSore = inject(SongsStore);

  songs$ = this.songsSore.songs$;

  ngOnInit(): void {
      this.songsSore.init();
  }

}
