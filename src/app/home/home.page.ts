import { Component, inject } from '@angular/core';
import { QuoteComponent } from "./quote/quote.component";
import { QuotesApi } from '../api-client/lib';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [QuoteComponent, AsyncPipe, JsonPipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {

  quotesApi = inject(QuotesApi);

  quotes$ = this.quotesApi.quotesGet({
    pageSize: 3,
    pageIndex: 0,
    
  });

}
