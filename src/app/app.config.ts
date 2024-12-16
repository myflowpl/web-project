import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        filter: (req) => false, // TUR OFF transfer state FOR TRAINING ONLY
      }),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([]),
    ),
    // {
    //   provide: HttpClient,
    //   useClass: HttpClient,
    // },
    // HttpClient,
  ]
};
