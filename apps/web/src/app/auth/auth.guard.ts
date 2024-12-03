import { CanActivateFn } from '@angular/router';
import { injectLoginDialog } from './login/login.dialog';

export type Role = 'user' | 'admin';

export function authGuard(...roles: Role[]): CanActivateFn {
  return () => {
    return injectLoginDialog().guard({
      message: 'Wymagane logowanie do tej strony',
    });
  };
}
