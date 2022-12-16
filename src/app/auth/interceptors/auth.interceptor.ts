import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginDialog } from '../dialogs/login-dialog/login-dialog.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  loginDialog = inject(LoginDialog);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // intercept REQUEST
    // console.log('REQUEST', request)

    if (this.authService.token) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.token}`,
        }),
      });
    }

    return next.handle(request).pipe(
      // INTERCEPT response
      tap({
        // next: (res) => console.log('RESPONSE', res),
        // error: (res) => console.log('RESPONSE ERROR', res)
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          return this.loginDialog.user$.pipe(
            switchMap((user) => {
              request = request.clone({
                headers: new HttpHeaders({
                  Authorization: `Bearer ${this.authService.token}`,
                }),
              });
              return next.handle(request);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
