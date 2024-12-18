import { Component, computed, inject, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from '../../../api/api.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SongsStore } from '../songs.store';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  templateUrl: './song-form.dialog.html',
  styleUrl: './song-form.dialog.scss'
})
export class SongFormDialog {
  artistId = inject<Data>(MAT_DIALOG_DATA).artistId;
  song = inject<Data>(MAT_DIALOG_DATA).song;
  store = inject(SongsStore);
  isVisible = false;
  title = computed(
    () => this.artistId ? `Add new song for artist ${this.artistId}` : `Edit song: ${this.song?.title}`
  );
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    id: [0, [], []],
    artistId: [0, [], []],
    title: ['New song', [Validators.minLength(2), Validators.required], []],
    year: ['2024', [Validators.required], []],
    webUrl: ['http://localhost/profile.jpg', [Validators.required], []],
  });

  constructor() {
    if(this.artistId) {
      this.form.patchValue({ artistId: this.artistId });
    }
  }

  handlSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);

    this.store.create(this.form.value).subscribe();
  }

  handleTest(e: any) {
    console.log(e.submitted, e);
  }
}
