import {
  ApplicationConfig,
  inject,
  PLATFORM_ID,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideExperimentalZonelessChangeDetection(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        filter: (req) => false, // TURN OFF transfer cache server -> client
      })
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi(), ),
    provideAnimationsAsync(),
    // {
    //   provide: IS_SERVER,
    //   useFactory: () => {
    //     const id = inject(PLATFORM_ID)
    //     return isPlatformServer(id);
    //   }
    // }
  ],
};
