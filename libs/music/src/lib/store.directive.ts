import { Directive, Input, inject } from '@angular/core';
import { SongsStore } from './songs/songs.store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[assecoStore]'
})
export class StoreDirective {

  private sort = inject(MatSort, { optional: true });

  private paginator = inject(MatPaginator, { optional: true });

  @Input()
  set assecoStore(store: SongsStore) {

    // setup SORT
    this.sort?.sortChange.subscribe(sort => store.sort = sort);

    // setup PAGINATROR
    this.paginator?.page.subscribe(page => store.page = page);
    
    store.page$.subscribe(page => {

      if(this.paginator) {
          this.paginator.length = page.length;
          this.paginator.pageIndex = page.pageIndex;
          this.paginator.pageSize = page.pageSize;
      }
    })

  }

}
