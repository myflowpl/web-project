import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Configuration } from '../api-client';
import { AuthStore } from './auth/auth.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    // {
    //   provide: BASE_URL,
    //   useValue: 'http://localhost:3000'
    // },
    provideHttpClient(
      withFetch(),
    ),
    // {
    //   provide: Configuration,
    //   useFactory: () => {

    //     return new Configuration({
    //       basePath: '',
    //     })
    //   }
    // }
    AuthStore,
  ]
};
