import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { ArtistsApi } from './api-client/lib';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'artists/:artistId',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const quotesApi = inject(ArtistsApi);
      const artists = await firstValueFrom(quotesApi.artistsGet());

      return artists.data.map(a => ({artistId: a.id+''}))
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
