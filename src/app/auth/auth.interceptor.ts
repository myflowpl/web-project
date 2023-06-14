import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { AuthStore } from './auth.store';
import { LoginDialog } from './login-dialog/login-dialog.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authStore = inject(AuthStore);
  loginDialog = inject(LoginDialog);

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
      map(res => res),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if(error.status === 401) {
          return this.loginDialog.open$.pipe(
            switchMap(user => {
              if(!user) {
                return throwError(() => error);
              }
              request = request.clone({
                headers: new HttpHeaders({
                  Authorization: 'Bearer ' + this.authStore.accessToken,
                })
              })
              return next.handle(request);
            }),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
