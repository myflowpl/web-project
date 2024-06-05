import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AuthStore } from './auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // INTERCEPT request
  const auth = inject(AuthStore);

  if(auth.accessToken()) {
    req = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + auth.accessToken()
      })
    });
  }
  
  console.log(req);
  return next(req).pipe(
    map(res => {
      console.log('INTERCEPT RESPONSE', res);
      return res;
    }),
    catchError(error => {

      console.log('INTERCEPT ERROR', error);
      return next(req);
      return throwError(() => error);
    }),
  );
};
