import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { BASE_URL } from 'src/app/api/api.config';
import { Song } from 'src/app/api/api.model';

export interface GetSongsParams {
  pageIndex?: number;
  pageSize?: number;
}

export interface GetSongsResponse {
  songs: Song[];
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private reload$ = new BehaviorSubject(true);

  private http = inject(HttpClient);

  private baseUrl = inject(BASE_URL);

  getSongs(params?: GetSongsParams): Observable<GetSongsResponse> {

    let _page = (params?.pageIndex && Number.isInteger(params?.pageIndex)) ? params.pageIndex+1 : 1;
    let _limit = (params?.pageSize) ? params?.pageSize : 5;

    return this.http.get<Song[]>(this.baseUrl+'/songs', {
      params: { _page, _limit },
      observe: 'response',
    }).pipe(
      map(res => ({
        songs: res.body || [],
        length: parseInt(res.headers.get('x-total-count') || '0')
      }))
    );

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
