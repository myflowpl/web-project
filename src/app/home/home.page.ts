import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

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

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected title = 'Welcome to Web Project';

  today = new Date();

  counter = 0;

  items: Item[] = [
    { id: 1, name: 'Piotr' },
    { id: 2, name: 'Paweł' },
    { id: 3, name: 'Adam' },
  ];

  selected$ = this.route.queryParamMap.pipe(
    map(params => params.get('id') || ''),
    map(id => parseInt(id, 10)),
    map(id => this.items.find(item => item.id === id)),
  );

  onToggleClick(e: Event): void {
    this.today = new Date();

    this.counter = this.counter+2;
  }

  onItemClick(e: Item) {
    console.log('save', e);
  }

  onItemDelete(e: Item) {
    console.log('delete', e);
  }

  onItemSelect(e: Item) {

    const queryParams = { id: e.id };

    this.router.navigate([], { queryParams });

  }

  closeSelected() {

    const queryParams = {  };

    this.router.navigate([], { queryParams });

  }

}
