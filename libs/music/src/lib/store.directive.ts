import { Directive, Input, inject } from '@angular/core';
import { SongsStore } from './songs/songs.store';
import { MatSort } from '@angular/material/sort';

@Directive({
  selector: '[assecoStore]'
})
export class StoreDirective {

  private sort = inject(MatSort);

  @Input()
  set assecoStore(store: SongsStore) {
    this.sort.sortChange.subscribe(sort => store.sort = sort)
  }

}
