import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../api/api.config';
import { Artist } from '../../api/api.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  baseUrl = inject(BASE_URL);
  http = inject(HttpClient);

  getArtists() {
    return this.http.get<Artist[]>(this.baseUrl + '/artists');
  }
}
