import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { BASE_URL } from 'src/app/api/api.config';
import { Song } from 'src/app/api/api.model';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private reload$ = new BehaviorSubject(true);

  private http = inject(HttpClient);

  private baseUrl = inject(BASE_URL);

  getSongs() {
    return this.http.get<Song[]>(this.baseUrl+'/songs');

    // return this.reload$.pipe(
    //   switchMap(() => this.http.get<Song[]>(this.baseUrl+'/songs'))
    // );
  }

  getSongById(id: number) {
    return this.http.get<Song>(this.baseUrl+'/songs/'+id);
  }

  update(song: Partial<Song>) {
    return this.http.patch<Song>(this.baseUrl+'/songs/'+song.id, song).pipe(
      // tap(() => this.reload$.next(true))
    );
  }

}
