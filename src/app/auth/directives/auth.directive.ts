import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  @Input()
  label = 'Login'

  @HostBinding('style.text-decoration')
  decoration = ''

  constructor(
    private loginService: LoginService,
  ) {}

  @HostListener('click')
  onClick() {
    this.decoration = 'underline';

    this.loginService.loginDialog$.subscribe();
  }

}
