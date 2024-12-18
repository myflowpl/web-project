import { Component, computed, inject, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from '../../../api/api.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SongsStore } from '../songs.store';

interface Data {
  artistId?: number;
  song?: Song;
}

export function injectSongFormDialog() {

  const dialog = inject(MatDialog);
  const injector = inject(Injector);

  return {
    create(artistId: number): Observable<Song> {

      const dialogRef = dialog.open(SongFormDialog, {
        width: '400px',
        disableClose: true,
        injector,
        data: { artistId }
      })

      return dialogRef.afterClosed();
    },
    edit(song: Song): Observable<Song> {
      return of();
    },
  }
}

@Component({
  selector: 'app-song-form',
  imports: [
    MatIcon,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './song-form.dialog.html',
  styleUrl: './song-form.dialog.scss'
})
export class SongFormDialog {
  artistId = inject<Data>(MAT_DIALOG_DATA).artistId;
  song = inject<Data>(MAT_DIALOG_DATA).song;
  store = inject(SongsStore);

  title = computed(
    () => this.artistId ? `Add new song for artist ${this.artistId}` : `Edit song: ${this.song?.title}`
  );

}
