import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { Configuration } from '../api-client';
import { AuthStore } from './auth/auth.store';
import { authInterceptor } from './auth/auth.interceptor';

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
      withInterceptors([authInterceptor])
    ),
    // {
    //   provide: Configuration,
    //   useFactory: () => {

    //     return new Configuration({
    //       basePath: '',
    //     })
    //   }
    // }
    // AuthStore,
  ]
};
