import { Directive, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  constructor(
    private authService: AuthService,
  ) {}

  @HostListener('click')
  onHostClick() {
    this.authService.loginDialog$.subscribe();
  }
}
