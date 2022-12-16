import { Injectable } from '@angular/core';

let count = 0;

@Injectable()
export class AppService {
  id = count++;

  constructor() {
    // console.log('AppService CONSTRUCTOR')
  }
}
