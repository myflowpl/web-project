import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { SongsService } from '../songs.service';
import { Song } from 'src/app/api/api.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.page.html',
  styleUrls: ['./song-edit.page.scss']
})
export class SongEditPage implements OnInit, OnDestroy {

  destroy$ = new Subject();

  router = inject(Router);
  route = inject(ActivatedRoute);
  songsService = inject(SongsService);

  fb = inject(UntypedFormBuilder);

  song?: Song;

  form = this.fb.group({
    id: [],
    title: ['', [Validators.required, Validators.minLength(3)], []],
    year: ['', [Validators.required]]
  });

  ngOnInit(): void {

    const param$ = this.route.paramMap;

    param$.pipe(
      map(params => parseInt(params.get('id') || '') ),
      switchMap(id => this.songsService.getSongById(id)),
      takeUntil(this.destroy$),
    )
    .subscribe(song => {

      this.song = song;

      this.form.patchValue(song);

    });
  }

  onSubmit() {
    console.log(this.form.valid, this.form.value);
    this.songsService.update(this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.close();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
  }
}
