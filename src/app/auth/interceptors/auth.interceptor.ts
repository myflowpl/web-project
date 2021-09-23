import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log('INTERCEPT BEFORE', request.method, request.url);

    if(this.authService.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.token}`)
      })
    }

    return next.handle(request).pipe(
      // tap(res => console.log('INTERCEPT AFTER', request.method, request.url, res)),
      catchError((err, cauth$) => {
        // console.log('INTERCEPT ERROR', request.method, request.url, err);

        if(err.status === 401) {

          return this.loginService.loginDialog$.pipe(
            switchMap((profile) => {
              if(profile) {
                request = request.clone({
                  headers: request.headers.set('Authorization', `Bearer ${this.authService.token}`)
                });
                return next.handle(request);
              } else {
                return throwError(err);
              }
            }),
          );

        }

        // return of(1).pipe(
        //   delay(2000),
        //   switchMap(() => cauth$),
        // )

        return throwError(err);
      }),
    );
  }
}
