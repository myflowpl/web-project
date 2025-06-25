import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuoteComponent } from "./quote/quote.component";
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Quote, QuotesApi, QuotesResponseDto } from '@web/api-client';

@Component({
  selector: 'app-home',
  imports: [QuoteComponent, AsyncPipe, JsonPipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {

  quotesApi = inject(QuotesApi);


  quotes = toSignal(this.quotesApi.quotesGet({
    pageSize: 3,
    pageIndex: 0,

  }), {initialValue: {data: []} as any as QuotesResponseDto });

  selectedIds = signal<number[]>([]);

  selected = computed(
    () => this.selectedIds().map(id => this.quotes().data.find(q => q.id===id))
  );

  constructor() {

    effect(() => {
      const ids = this.selected();
      console.log('EFFECT', ids)
      if(ids.length > 5) {
        console.log('quotes', this.quotes(), ids)

      }
      // untracked(() => {
      //   console.log('quotes', this.quotes(), ids)
      // });
    });
  }

  handleSelected(quote: Quote) {
    const newIds = [...this.selectedIds(), quote.id];
    this.selectedIds.set(newIds)


    // this.selectedIds.update((ids) => [...ids, quote.id]);

  }

}
