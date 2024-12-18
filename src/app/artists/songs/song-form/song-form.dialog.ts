import { Component, computed, inject, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from '../../../api/api.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SongsStore } from '../songs.store';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

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
      
      const dialogRef = dialog.open(SongFormDialog, {
        width: '400px',
        disableClose: true,
        injector,
        data: { song }
      })

      return dialogRef.afterClosed();
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
    JsonPipe,
  ],
  templateUrl: './song-form.dialog.html',
  styleUrl: './song-form.dialog.scss'
})
export class SongFormDialog {
  artistId = inject<Data>(MAT_DIALOG_DATA).artistId;
  song = inject<Data>(MAT_DIALOG_DATA).song;
  store = inject(SongsStore);
  dialogRef = inject(MatDialogRef);

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
    if(this.song) {
      this.form.patchValue(this.song);
    }
  }

  handlSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);

    if(this.artistId) {
      this.store.create(this.form.value).subscribe(
        (song) => this.dialogRef.close(song)
      );
    } else {
      this.store.update(this.form.value).subscribe(
        (song) => this.dialogRef.close(song)
      );
    }
  }

  handleTest(e: any) {
    console.log(e.submitted, e);
  }
}
