import { ApplicationConfig, inject, provideAppInitializer, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection, REQUEST, REQUEST_CONTEXT } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { DOMAIN, CONFIG, injectIsPlatformServer } from './app.tokens';
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

      Object.assign(configService, environment)

      // TODO  opcjonalnie gdy potrfzebujemy zaciagnac config z zewnetrzengo serwisu

      // return fetch(environment.domain+'/config.json').then(res => res.json()).then(
      //   config => {
      //     Object.assign(configService, config)
      //   }
      // )
    }),
    {
      provide: DOMAIN,
      useFactory: () => {
        const config = inject(CONFIG);
        return config.domain;
      },
    },
  ]
};
