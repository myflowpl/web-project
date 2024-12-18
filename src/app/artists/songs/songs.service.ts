import { inject, Injectable } from '@angular/core';
import { injectConfig } from '../../app.tokens';
import { HttpClient } from '@angular/common/http';
import { Song, SongDto, SongResponse } from '../../api/api.model';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  baseUrl = injectConfig().baseUrl;
  http = inject(HttpClient);

  getSongsByArtistId(params: Partial<SongDto> = {}): Observable<SongResponse> {
    const { _page } = params;

    // if(_page && _page > 2) {
    //   return throwError(() => new Error('Page number is to large'));
    // }

    return this.http.get<Song[]>(this.baseUrl+'/songs', {
      params: {...params},
      observe: 'response'
    }).pipe(
      map(res => ({
        songs: res.body || [],
        length: parseInt(res.headers.get('x-total-count') || '0'),
      }))
    )
  }

  create(song: Partial<Song>) {
    return this.http.post<Song>(this.baseUrl+'/songs', song, {})
  }

  update(song: Partial<Song>) {
    return this.http.patch<Song>(this.baseUrl+'/songs/'+song.id, song, {})
  }
}
