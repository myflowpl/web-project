import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AuthStore } from './auth.store';
import { LoginService } from './login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // INTERCEPT request
  const auth = inject(AuthStore);
  const loginService = inject(LoginService);

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

      // return loginService.loginDialog$.pipe(

      // );
      return throwError(() => error);
    }),
  );
};
