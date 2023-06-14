import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authStore = inject(AuthStore);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // before request -> modify request
    
    if(this.authStore.accessToken) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authStore.accessToken,
        })
      })
    }

    return next.handle(request).pipe(
      // after request -> modify response
      map(res => res)
    );
  }
}
