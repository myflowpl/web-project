import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface QuoteState {
  search: string;
  quotes: Quote[];
  favorite: Quote[];
  selectedId: number | null;
}

@Injectable()
export class HomePageStore extends ComponentStore<QuoteState> {

  constructor() {
    super({
      search: '',
      quotes: [],
      favorite: [],
      selectedId: null,
    });
  }
}
