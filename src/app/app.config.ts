import { ApplicationConfig, inject, provideAppInitializer, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection, REQUEST, REQUEST_CONTEXT } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { API_1_BASE_URL, CONFIG, injectIsPlatformServer } from './app.tokens';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideExperimentalZonelessChangeDetection(),
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
    provideAppInitializer(() => {

      const configService = inject(CONFIG);

      const baseUrl = environment.baseUrl;

      // Object.assign(configService, environment)

      return fetch(baseUrl+'/config.json').then(res => res.json()).then(
        config => {
          Object.assign(configService, config)
        }
      )
    }),
    {
      provide: API_1_BASE_URL,
      useFactory: () => {
        const config = inject(CONFIG);
        return config.api1BaseUrl;
      },
    },
  ]
};
