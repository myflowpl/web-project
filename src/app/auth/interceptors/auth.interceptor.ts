import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // intercept REQUEST
    console.log('REQUEST', request)

    if(this.authService.token) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.token}`
        })
      });
    }

    return next.handle(request).pipe(
      // INTERCEPT response
      tap({
        next: (res) => console.log('RESPONSE', res),
        error: (res) => console.log('RESPONSE ERROR', res)
      })
    );
  }
}
