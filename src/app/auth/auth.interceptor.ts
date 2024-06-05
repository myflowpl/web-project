import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, switchMap, throwError } from 'rxjs';
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
  
  
  return next(req).pipe(
    map(res => {
      // 'INTERCEPT RESPONSE'
      return res;
    }),
    catchError(error => {

      // INTERCEPT ERROR
      // przechwytujemy unauthorized errors
      if(error.status === 401 || error.status === 403) {

        // wyswietl onko logowania
        return loginService.loginDialog$.pipe(
          switchMap(user => {
            // jesli nie zalogowany zwracamy błąd
            if(!user) {
              return throwError(() => error);
            }
            // jeśli zalogoany, to tworzymy ponownie request z nowym tokenem
            req = req.clone({
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + auth.accessToken()
              })
            });
            // i ponawiamy request na serwer
            return next(req);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
