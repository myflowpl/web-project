import { DestroyRef, Directive, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface DataStore {
    length: () => number;
    pageSize: () => number;
    pageIndex: () => number;
    setPage(page: PageEvent): void
}

@Directive({
  selector: '[storePaginator]'
})
export class StorePaginator {

  storePaginator = input.required<DataStore>();

  destroyRef = inject(DestroyRef);
  paginator = inject(MatPaginator);

  constructor() {

    // update paginator
    effect(() => {
      const store = this.storePaginator();
      this.paginator.length = store.length();
      this.paginator.pageIndex = store.pageIndex();
      this.paginator.pageSize = store.pageSize();
    });

    // update store
    this.paginator.page.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(page => this.storePaginator().setPage(page))

   }

}
