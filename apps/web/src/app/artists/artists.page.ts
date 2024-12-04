import { Component, computed, inject, Injectable, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface Artist {
  id: number;
  name: string;
}

export interface ArtistsDto {
  _limit: number;
  _page: number;
}

export interface ArtistsResponse {
  artists: Artist[];
  total: number;
}

@Injectable({providedIn: 'root'})
export class ArtistService {

  http = inject(HttpClient);

  search(params: ArtistsDto): Observable<ArtistsResponse> {
    return this.http.get<Artist[]>('http://localhost:3000/artists', {params: params as any, observe: 'response'}).pipe(
      map(res => {
        return { 
          artists: res.body || [], 
          total: parseInt(res.headers.get('content-length') || '0', 10) 
        }
      }),
    )
  }
}

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './artists.page.html',
  styleUrl: './artists.page.css',
})
export class ArtistsPage {

  service = inject(ArtistService);

  params = signal({
    _limit: 5,
    _page: 1,
  });

  artists = rxResource({
    request: () => (this.params()),
    loader: ({ request }) => this.service.search(request),
  });

  error = computed(() => this.artists.error() as HttpErrorResponse | undefined);
}
