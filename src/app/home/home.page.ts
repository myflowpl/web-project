import { Component, inject } from '@angular/core';
import { QuoteComponent } from "./quote/quote.component";
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Quote, QuotesApi } from '@web/api-client';

@Component({
  selector: 'app-home',
  imports: [QuoteComponent, AsyncPipe, JsonPipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {

  quotesApi = inject(QuotesApi);

  selected: Quote[] = [];

  quotes$ = this.quotesApi.quotesGet({
    pageSize: 3,
    pageIndex: 0,

  });

  handleSelected(quote: Quote) {
    this.selected.push(quote)
  }
}
