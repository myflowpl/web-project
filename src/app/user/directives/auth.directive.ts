import { Directive, HostListener } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  constructor(
    private userService: UserService,
  ) {}

  @HostListener('click')
  onHostClick() {
    this.userService.login({
      email: 'piotr@myflow.pl',
      password: '12345'
    }).subscribe();
  }
}
