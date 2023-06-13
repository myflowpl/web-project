import { Component, inject } from '@angular/core';
import { SongsService } from './songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.page.html',
  styleUrls: ['./song-list.page.scss']
})
export class SongListPage {

  songsService = inject(SongsService);

  songs$ = this.songsService.getSongs();

}
