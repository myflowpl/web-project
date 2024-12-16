import { ApplicationConfig, inject, provideAppInitializer, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection, REQUEST } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { API_1_BASE_URL, CONFIG, injectIsPlatformServer } from './app.tokens';

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

      const isServer = injectIsPlatformServer();
      
      const configService = inject(CONFIG);
      const request = inject(REQUEST);
      console.log('REQUEST', request);

      let baseurl = '';
      if(request) {
        baseurl = request.headers.get('proto') + '://' + request.headers.get('host');
      }

      return fetch(baseurl+'/config.json').then(res => res.json()).then(
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
