import { inject, Injectable } from '@angular/core';
import { injectConfig } from '../app.tokens';
import { HttpClient } from '@angular/common/http';
import { Artist, ArtistDto, ArtistResponse } from '../api/api.model';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  baseUrl = injectConfig().baseUrl;
  http = inject(HttpClient);

  getArtists(params: Partial<ArtistDto> = {}): Observable<ArtistResponse> {
    const { _page } = params;

    if(_page && _page > 2) {
      return throwError(() => new Error('Page number is to large'));
    }

    return this.http.get<Artist[]>(this.baseUrl+'/artists', {
      params: {...params},
      observe: 'response'
    }).pipe(
      map(res => ({
        artists: res.body || [],
        length: parseInt(res.headers.get('x-total-count') || '0'),
      }))
    )
  }
}
