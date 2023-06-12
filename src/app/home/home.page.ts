import { Component } from '@angular/core';

export interface Item {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  protected title = 'Welcome to Web Project';

  today = new Date();

  counter = 0;

  items: Item[] = [
    { id: 1, name: 'Piotr' },
    { id: 2, name: 'Paweł' },
    { id: 3, name: 'Adam' },
  ];

  onToggleClick(e: Event): void {
    this.today = new Date();
    console.log(e);

    this.counter = this.counter+2;
  }

}
