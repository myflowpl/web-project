import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from '@web/api-client';

@Component({
  selector: 'app-quote',
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {


  @Input()
  quote: Quote | null = null;

  @Output()
  selected = new EventEmitter<Quote>();

  handleSelect(quote: Quote) {
    this.selected.emit(quote);
  }

}
