import { CanActivateFn } from '@angular/router';
import { injectLoginDialog } from './login/login.dialog';
import { DOMAIN, injectIsServer, injectLocalStorage, injectWindow } from '../utils';
import { inject } from '@angular/core';

export type Role = 'user' | 'admin';

export function authGuard(...roles: Role[]): CanActivateFn {
  return () => {

    const window = injectWindow();

    const storage = injectLocalStorage();

    const domain = inject(DOMAIN);

    // console.log('WINDOW', window?.location?.pathname);

    const isServer = injectIsServer();

    if(isServer) {
      return false;
    }

    return injectLoginDialog().guard({
      message: 'Wymagane logowanie do tej strony',
    });
  };
}
