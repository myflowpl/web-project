import { Directive, HostListener } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  constructor(
    private loginService: LoginService,
  ) { }

  @HostListener('click')
  onClick() {
    this.loginService.dialog$.subscribe();
  }
}
