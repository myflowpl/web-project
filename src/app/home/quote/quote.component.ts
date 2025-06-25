import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { Quote } from '@web/api-client';

@Component({
  selector: 'app-quote',
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {


  quote = input<Quote>();

  selected = output<Quote>();

  // @Input()
  // quote: Quote | null = null;

  // @Output()
  // selected = new EventEmitter<Quote>();

  handleSelect(quote: Quote) {
    this.selected.emit(quote);
  }

}
