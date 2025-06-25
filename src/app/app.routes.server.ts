import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { QuotesApi } from './api-client/lib';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'test',
  //   renderMode: RenderMode.Prerender
  // },
  // {
  //   path: 'test/:id',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     const quotesApi = inject(QuotesApi);
  //     const quotes = await firstValueFrom(quotesApi.quotesGet());

  //     return quotes.data.map(quote => ({id: quote.id+''}))
  //   },
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
