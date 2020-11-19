import { Directive } from '@angular/core';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  constructor() {
    console.log('AUTH DIRECTIVE')
  }

}
